import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class AirVent extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'airVent');
	}

	public OnGameObjectUp(): void {
		let player = this.GetScene().GetPlayer();
		let inventory = Scene.InventoryScene.GetInventory();

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, player.getBounds()) && inventory.GetSlotIndexByKey('knife-inventory') >= 0) {
			inventory.DeleteElementAt(inventory.GetSlotIndexByKey('knife-inventory'));
			this.GetScene().scene.remove('InventoryScene');
			this.GetScene().scene.start('EndScene');
			this.GetScene().load.start();
		}
	}
}