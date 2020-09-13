import Inventory from '../General/Inventory';
import Crafter from '../General/Crafter';
import Scene from './Scene';

export default class InventoryScene extends Scene {
	private Inventory: Inventory;
	private Crafter: Crafter;
	private InventoryX: number;
	private InventoryY: number;

	public constructor(x: number, y: number) {
		super('InventoryScene');

		this.InventoryX = x;
		this.InventoryY = y;
	}

	public GetInventory() {
		return this.Inventory;
	}

	public create() {
		this.Inventory = new Inventory({
			scene: this,
			x: this.InventoryX,
			y: this.InventoryY,
			size: 4,
			backgroundSpriteKey: 'inventoryBackground'
		});

		this.input.keyboard.on('keydown', this.onKeyInput, this);
		this.Crafter = new Crafter([
			{
				sources: ['keyPiece1-inventory', 'keyPiece3-inventory', 'keyPiece2-inventory'],
				target: 'key-inventory'
			},
			{
				sources: ['tape-inventory', 'fork-inventory','plantSupport-inventory'],
				target: 'crowbar-inventory'
			},
			{
				sources: ['blade-inventory', 'logs-inventory','glue-inventory'],
				target: 'stool-inventory'
			}
		]);
	}

	public update(): void {}

	private onKeyInput(event) {
		switch(event.key) {
			case "&":
				this.Inventory.ToggleSlotSelection(0);
				break;
			case "é":
				this.Inventory.ToggleSlotSelection(1);
				break;
			case "\"":
				this.Inventory.ToggleSlotSelection(2);
				break;
			case "\'":
				this.Inventory.ToggleSlotSelection(3);
				break;
			case "c":
				if (this.Crafter.Try(this) === 'key-inventory') {
					this.events.emit('KeyBuilt');
				}
				break;
			case "Enter":
				this.Inventory.Read();
				break;
			default:
				break;
		}
	}
}