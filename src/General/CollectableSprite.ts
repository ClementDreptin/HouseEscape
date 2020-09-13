import Sprite from './Sprite';
import Collectable from './Collectable';
import Scene from '../Scenes/Scene';

export default class CollectableSprite extends Sprite {
	public Collectable: Collectable;

	public constructor(collectable: Collectable, scene: Scene, x: number, y: number, key?: string) {
		super(scene, x, y, key ? key : collectable.GetKey());

		this.Collectable = collectable;
	}

	public Collect(): void {
		if (this.Collectable.GetKey() === 'sheet') {
			this.GetScene().events.emit('LetterPickedUp');
		}
		this.destroy();
	}
}