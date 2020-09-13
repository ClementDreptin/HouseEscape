import InteractableSprite from '../General/InteractableSprite';
import Scene from '../Scenes/Scene';

export default class Letter extends InteractableSprite {
	public ItemToDestroy: string;

	public constructor(scene: Scene, x: number, y: number, key: string, itemToDestroy: string) {
		super(scene, x, y, key);

		this.ItemToDestroy = itemToDestroy;
	}

	public OnGameObjectUp(): void {
		let inventory = Scene.InventoryScene.GetInventory();
		inventory.DeleteElementAt(inventory.GetSlotIndexByKey(this.ItemToDestroy));

		this.GetScene().events.emit('LetterClosed');

		this.destroy();
	}
}