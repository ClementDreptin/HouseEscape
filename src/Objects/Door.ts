import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class Door extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'door');
	}

	public OnGameObjectUp(): void {
		let player = this.GetScene().GetPlayer();
		let inventory = Scene.InventoryScene.GetInventory();

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, player.getBounds()) && inventory.GetSlotIndexByKey('key-inventory') >= 0) {
			inventory.DeleteElementAt(inventory.GetSlotIndexByKey('key-inventory'));
			this.GetScene().scene.start('Scene1');
			this.GetScene().load.start();
		}
	}
}