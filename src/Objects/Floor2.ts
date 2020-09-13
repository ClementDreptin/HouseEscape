import Scene from '../Scenes/Scene';
import InteractableSprite from '../General/InteractableSprite';

export default class Floor2 extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'floor2');

		this.HitBox.x += this.HitBox.width - 200;
		this.HitBox.width = 200;
		this.HitBox.height = 100;
	}

	OnGameObjectUp(): void {
		let inventory = Scene.InventoryScene.GetInventory();

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, this.GetScene().GetPlayer().getBounds()) && inventory.GetSlotIndexByKey('stool-inventory') >= 0) {
			this.GetScene().events.emit('StoolPlaced');
			inventory.DeleteElementAt(inventory.GetSlotIndexByKey('stool-inventory'));
		}
	}
}