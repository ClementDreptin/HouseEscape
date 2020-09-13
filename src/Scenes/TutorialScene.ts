import Scene from './Scene';
import Collectable from '../General/Collectable';
import CollectableSprite from '../General/CollectableSprite';
import DestroyableCollectableProvider from '../General/DestroyableCollectableProvider';
import DestroyableOnClick from '../General/DestroyableOnClick';
import Door from '../Objects/Door';
import Sprite from '../General/Sprite';

export default class TutorialScene extends Scene {
	private CurrentMessage: Phaser.GameObjects.Image;
	private Carpet: DestroyableOnClick;
	private KeyPiece2: DestroyableCollectableProvider;

	public constructor() {
		super('TutorialScene');
	}

	public create(): void {
		super.create();

		// Creates the floor
		this.add.image(624, 480, 'tutorialFloor');

		this.ChangeCurrentMessage(816, 288, 'message1');

		this.CollisionObj.add(new Sprite(this, 624, 864, 'tutorialDesk'));
		this.CollisionObj.add(new Sprite(this, 336, 144, 'unmadeBed'));

		this.CollectableObj.add(new Collectable(this, 'sheet', 'sheet-inventory').CreateGameObject(960, 672));

		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 576, 852, 'keyPiece1', 'keyPiece1-inventory'));

		this.KeyPiece2 = new DestroyableCollectableProvider(this, 480, 528, 'keyPiece2', 'keyPiece2-inventory');
		this.CollisionObjInteract.add(this.KeyPiece2);

		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 336, 144, 'bed', 'keyPiece3-inventory'));
		this.CollisionObjInteract.add(new Door(this, 1056, 96));

		this.add.image(384, 528, 'foldedCarpet');
		this.Carpet = new DestroyableOnClick(this, 480, 528, 'carpet');

		super.addPlayerAndItsPhysics();
		this.physics.add.collider(this.GetPlayer(), this.CollectableObj, (player, collectableObjectGame: CollectableSprite) => collectableObjectGame.Collectable.Collect(), null, this);

		// Changes the current message 3 seconds after the first one appeared.
		setTimeout(() => this.ChangeCurrentMessage(960, 528, 'message2'), 3000);

		// Events listeners
		this.events.once('KeyPiece1PickedUp', () => this.ChangeCurrentMessage(240, 336, 'message6'));
		this.events.once('KeyPiece2PickedUp', () => this.ChangeCurrentMessage(1008, 168, 'message8'));
		this.events.once('KeyPiece3PickedUp', () => this.ChangeCurrentMessage(432, 696, 'message7'));
		this.events.once('LetterPickedUp', () => this.ChangeCurrentMessage(1008, 96, 'message3'));
		Scene.InventoryScene.events.once('LetterClosed', () => this.ChangeCurrentMessage(336, 816, 'message5'));
		Scene.InventoryScene.events.once('KeyBuilt', () => this.ChangeCurrentMessage(816, 120, 'message9'));
		Scene.InventoryScene.events.once('SheetInventorySelected', () => this.ChangeCurrentMessage(1008, 96, 'message4'));
	}

	private ChangeCurrentMessage(x: number, y: number, key: string): void {
		if (this.CurrentMessage) this.CurrentMessage.destroy();
		this.CurrentMessage = this.add.image(x, y, key);
	}

	public update(): void {
		super.update();

		if (this.physics.overlap(this.GetPlayer(), this.Carpet)) {
			this.KeyPiece2.body.enable = false;
		} else if (this.KeyPiece2.body) {
			this.KeyPiece2.body.enable = true;
		}
	}
}