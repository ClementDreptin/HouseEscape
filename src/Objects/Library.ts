import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class Library extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'library');

		const deltaHitBox = 2;

		this.HitBox.x += (this.HitBox.width / 2) - deltaHitBox;
		this.HitBox.y += this.HitBox.height;
		this.HitBox.width = this.HitBox.width / 8;
		this.HitBox.height = this.HitBox.height / 3;
	}

	public OnGameObjectUp(): void {
		let inventory = Scene.InventoryScene.GetInventory();
		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, this.GetScene().GetPlayer().getBounds()) && inventory.GetSlotIndexByKey('ladder-inventory') >= 0) {
			this.GetScene().events.emit('UsedLadderPlaced');
			inventory.DeleteElementAt(inventory.GetSlotIndexByKey('ladder-inventory'));
		}
	}
}