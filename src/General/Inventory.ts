import Collectable from './Collectable';
import Letter from '../Objects/Letter';
import InventoryScene from '../Scenes/InventoryScene';

interface InventoryConfig {
	scene: InventoryScene;
	size: number;
    x: number;
	y: number;
	backgroundSpriteKey: string;
	slotWidth?: number;
	slotHeight?: number;
	paddingX?: number;
	paddingY?: number;
	selectionStyle?: {
		lineWidth: number;
		color: number;
		alpha: number;
	}
}

export interface Slot {
	frame: Phaser.GameObjects.Graphics;
	collectable: Collectable;
	index: number;
	sprite: Phaser.GameObjects.Sprite;
	used: boolean;
}

export default class Inventory extends Phaser.GameObjects.Container {
	private Config: InventoryConfig;
	private Slots: Slot[] = [];

	public constructor(config: InventoryConfig) {
		super(config.scene,  config.x, config.y);

		this.Config = config;

		this.Config.scene.add.existing(this);
		this.SetDefaultConfig();

		let background = this.Config.scene.add.image(0, 0, this.Config.backgroundSpriteKey);
		background.setOrigin(0);
		this.add(background);

		let x = this.Config.paddingX;
		let y = this.Config.paddingY;

		for(let i = 0; i < this.Config.size; i++) {
			let graphics = config.scene.add.graphics({ x, y });
			this.add(graphics);
			graphics.lineStyle(this.Config.selectionStyle.lineWidth, this.Config.selectionStyle.color, this.Config.selectionStyle.alpha);
			graphics.strokeRect(0, 0, this.Config.slotWidth, this.Config.slotHeight);
			graphics.visible = false;
			this.Slots.push({
				frame: graphics,
				collectable: null,
				index: i,
				sprite: null,
				used: false
			});
			y += this.Config.paddingY + this.Config.slotHeight;
		}
	}

	private SetDefaultConfig(): void {
		if (!this.Config.slotWidth) this.Config.slotWidth = 90;
		if (!this.Config.slotHeight) this.Config.slotHeight = 90;
		if (!this.Config.paddingX) this.Config.paddingX = 3;
		if (!this.Config.paddingY) this.Config.paddingY = 12;
		if (!this.Config.selectionStyle) this.Config.selectionStyle = {
			lineWidth: 4,
			color: 0xff0000,
			alpha: 0.8
		};
	}

	public ToggleSlotSelection(index: number): Slot {
		if (index >= 0 && index < this.Slots.length){
			if (this.Slots[index].collectable){
				this.Slots[index].frame.visible = !this.Slots[index].frame.visible;

				if (this.Slots[index].frame.visible && this.Slots[index].collectable.GetKeyInInventory() === 'sheet-inventory') {
					this.Config.scene.events.emit('SheetInventorySelected');
				}
			} else {
				console.warn("Unused slot!");
			}
		} else {
			console.error("Out of range");
		}

		return this.Slots[index];
	}

	public GetSelectedSlots(): Slot[] {
		return this.Slots.filter(slot => slot.frame.visible);
	}

	public GetSlotIndexByKey(key: string): number {
		const slot = this.Slots.find(slot => slot.frame.visible && slot.collectable.GetKeyInInventory() === key);
		if (slot) {
			return slot.index;
		}else{
			return -1;
		}
	}

	public GetElementAt(index: number): Collectable {
		if (index >= 0 && index < this.Slots.length) {
			if (!this.Slots[index].collectable) {
				console.warn("Unused slot!");
			}
			return this.Slots[index].collectable;
		} else {
			console.error("no out of range");
			return undefined;
		}
	}

	public IsFull(): boolean {
		for (let i = 0; i < this.Config.size; i++) {
			if (!this.Slots[i].collectable){
				return false;
			}
		}
		return true;
	}

	public AddElement(element: Collectable): number {
		// Checks if there is an available slot
		for (let i = 0; i < this.Config.size; i++) {
			if (!this.Slots[i].used) {
				const sprite = this.scene.add.sprite(
					this.Slots[i].frame.x+this.Config.slotWidth / 2,
					this.Slots[i].frame.y+this.Config.slotHeight / 2,
					element.GetKeyInInventory()
				);
				this.add(sprite);
				this.Slots[i].sprite = sprite;
				this.Slots[i].collectable = element;
				this.Slots[i].used = true;
				return i;
			}
		}
		return -1;
	}

	public DeleteElementAt(index: number): void {
		if (index >= 0 && index < this.Slots.length) {
			if (this.Slots[index].collectable) {
				this.remove(this.Slots[index].sprite, true); // Destroys the sprite
				this.Slots[index].frame.visible = false;
				this.Slots[index].used = false;
			} else {
				console.warn("Unused slot!");
			}
		} else {
			console.error("Out of range!");
		}
	}
	
	public Read(): void {
		if (this.GetSlotIndexByKey('book-inventory') >= 0) {
			new Letter(this.Config.scene, 624, 480, 'victimLetter', 'book-inventory');
		} else if (this.GetSlotIndexByKey('envelope-inventory') >= 0) {
			new Letter(this.Config.scene, 624, 480, 'kidnapperLetter','envelope-inventory');
		} else if (this.GetSlotIndexByKey('sheet-inventory') >= 0) {
			new Letter(this.Config.scene, 624, 480, 'paperToRead', 'sheet-inventory');
		}
	}
}