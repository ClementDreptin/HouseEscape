import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class BrokenButton extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'brokenButton');
	}

	public OnGameObjectUp(): void {
		let player  = this.GetScene().GetPlayer();

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.HitBox, player.getBounds())) {
			this.GetScene().events.emit('BrokenButtonPressed');
		}
	}
}