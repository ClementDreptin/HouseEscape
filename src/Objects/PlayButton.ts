import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class PlayButton extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'playButton');
	}

	public OnGameObjectUp(): void {
		this.GetScene().scene.start('TutorialScene');
		this.GetScene().scene.run('InventoryScene');
		this.GetScene().scene.bringToTop('InventoryScene');
		this.GetScene().load.start();
	}
}