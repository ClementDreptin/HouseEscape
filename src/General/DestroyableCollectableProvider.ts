import CollectableProvider from './CollectableProvider';
import Scene from '../Scenes/Scene';

export default class DestroyableCollectableProvider extends CollectableProvider {
	public constructor(scene: Scene, x: number, y: number, key: string, itemToCollect: string) {
		super(scene, x, y, key, itemToCollect);
	}

	public OnGameObjectUp(): void {
		super.OnGameObjectUp();

		// If the provider is empty, it means it was successfully used and cannot be used again. 
		if (this.IsEmpty()) {
			if (this.GetKey() === 'keyPiece1') {
				this.GetScene().events.emit('KeyPiece1PickedUp');
			}

			if (this.GetKey() === 'keyPiece2') {
				this.GetScene().events.emit('KeyPiece2PickedUp');
			}

			if (this.GetKey() === 'bed') {
				this.GetScene().events.emit('KeyPiece3PickedUp');
			}

			this.destroy();
		}
	}
}