import InteractableSprite from './InteractableSprite';
import Scene from '../Scenes/Scene';
import Collectable from '../General/Collectable';

export default class CollectableProvider extends InteractableSprite {
	private Key: string;
	private Empty: boolean;
	private ItemToCollect: string;

	public constructor(scene: Scene, x: number, y: number, key: string, itemToCollect: string) {
		super(scene, x, y, key);

		this.Key = key;
		this.Empty = false;
		this.ItemToCollect = itemToCollect;

		const deltaHitBox = 2;
		this.HitBox.x -= deltaHitBox;
		this.HitBox.y -= deltaHitBox;
		this.HitBox.width += 2 * deltaHitBox;
		this.HitBox.height += 2 * deltaHitBox;
	}

	public GetKey(): string {
		return this.Key;
	}

	public IsEmpty(): boolean {
		return this.Empty;
	}

	public OnGameObjectUp(): void {
		let player = this.GetScene().GetPlayer();

		let inventory = Scene.InventoryScene.GetInventory();
		if (this.Empty || inventory.IsFull()) {
			return;
		}

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, player.getBounds())) {
			let collectable = new Collectable(Scene.InventoryScene, this.Key, this.ItemToCollect);
			collectable.Collect();
			this.Empty = true;
		}
	}
}