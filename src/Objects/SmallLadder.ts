import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class SmallLadder extends InteractableSprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'smallLadder');

		this.depth = 1;
	}

	public OnGameObjectUp(): void {}
}