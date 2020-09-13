import Sprite from './Sprite';
import Scene from '../Scenes/Scene';

export default abstract class InteractableSprite extends Sprite {
	protected HitBox: any;

	public constructor(scene: Scene, x: number, y: number, key: string) {
		super(scene, x, y, key);
		
		// Creates a HitBox
		this.HitBox = this.getBounds();

		// Enables interaction between the player and the object.
		this.setInteractive();
		this.on('pointerup', this.OnGameObjectUp, this);
	}

	public abstract OnGameObjectUp(): void;
}