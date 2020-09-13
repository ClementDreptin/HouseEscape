import Scene from '../Scenes/Scene';
import CollectableSprite from './CollectableSprite';

export default class Collectable {
	private Scene: Scene;
	private Key: string;
	private KeyInInventory: string;
	private GameObject: CollectableSprite;

	public constructor(scene: Scene, key: string, keyInInventory: string = key) {
		this.Scene = scene;
		this.Key = key;
		this.KeyInInventory = keyInInventory;
	}

	public GetKey(): string {
		return this.Key;
	}

	public GetKeyInInventory(): string {
		return this.KeyInInventory;
	}
	
	public CreateGameObject(x: number, y: number): CollectableSprite {
		this.GameObject = new CollectableSprite(this, this.Scene, x, y);
		return this.GameObject;
	}
	
	public Collect(): Collectable {
		if (this.GameObject) {
			this.GameObject.Collect();
		}
		if (Scene.InventoryScene.GetInventory().AddElement(this) === -1) {
			return null;
		}
		return this;
	}
}