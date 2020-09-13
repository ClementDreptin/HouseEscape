import InteractableSprite from './InteractableSprite';
import Scene from '../Scenes/Scene';

export default class DestroyOnClickWithItem extends InteractableSprite {
	private ItemToGet: string;

	public constructor(scene: Scene, x: number, y: number, key: string, itemToGet: string) {
		super(scene, x, y, key);

		this.ItemToGet = itemToGet;
	}

	public OnGameObjectUp(): void {
		let player = this.GetScene().GetPlayer();
		let inventory = Scene.InventoryScene.GetInventory();

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, player.getBounds()) && inventory.GetSlotIndexByKey(this.ItemToGet) >= 0) {
			this.destroy();
			inventory.DeleteElementAt(inventory.GetSlotIndexByKey(this.ItemToGet));
		}
	}
}