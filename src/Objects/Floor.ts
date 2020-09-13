import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class Floor extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'floor');

		this.HitBox.width = 100;
		this.HitBox.height = 100;
	}

	public OnGameObjectUp(): void {
		let inventory = Scene.InventoryScene.GetInventory();

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, this.GetScene().GetPlayer().getBounds()) && inventory.GetSlotIndexByKey('crowbar-inventory') >= 0) {
			inventory.DeleteElementAt(inventory.GetSlotIndexByKey('crowbar-inventory'));
			this.scene.scene.start('Scene2');
			this.scene.load.start();
		}
	}
}