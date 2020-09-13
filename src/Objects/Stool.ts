import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class Stool extends InteractableSprite {
	static SmallLadderPlaced: boolean;

	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'stool');
	}

	public OnGameObjectUp(): void {
		if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.GetScene().GetPlayer().getBounds()) && Stool.SmallLadderPlaced) {
			this.GetScene().scene.start('Scene3');
			this.GetScene().load.start();
		}
	}
}