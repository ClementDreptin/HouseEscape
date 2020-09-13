import Scene from './Scene';
import DestroyableCollectableProvider from '../General/DestroyableCollectableProvider';
import Collectable from '../General/Collectable';
import CollectableSprite from '../General/CollectableSprite';
import CollectableProvider from '../General/CollectableProvider';
import Floor from '../Objects/Floor';
import Library from '../Objects/Library';
import UsedLadder from '../Objects/UsedLadder';
import Sprite from '../General/Sprite';

export default class Scene1 extends Scene {
	private Floor: Floor;
	private Library: Library;
	private UsedLadder: UsedLadder;

	public constructor() {
		super('Scene1');
	}

	public create(): void {
		super.create();

		this.Floor = new Floor(this, 624, 480);

		this.Library = new Library(this, 576, 132);
		this.Library.body.setSize(672, 144);

		this.CollisionObj.add(new Sprite(this, 216, 576, 'chair'));
		this.CollisionObj.add(new Sprite(this, 96, 336, 'plant'));
		this.CollisionObj.add(new Sprite(this, 528, 864, 'couch'));

		this.CollisionObjInteract.add(new CollectableProvider(this, 96, 576, 'desk', 'tape-inventory'));
		this.CollisionObjInteract.add(new CollectableProvider(this, 984, 768, 'bar', 'fork-inventory'));
		this.CollisionObjInteract.add(this.Library);
		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 96, 336, 'plantSupport', 'plantSupport-inventory'));
		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 1056, 156, 'ladder', 'ladder-inventory'));

		this.CollectableObj.add((new Collectable(this, 'book', 'book-inventory')).CreateGameObject(587, 63));
		this.CollectableObj.add((new Collectable(this, 'envelope', 'envelope-inventory')).CreateGameObject(384, 480));

		super.addPlayerAndItsPhysics();
		this.physics.add.collider(this.GetPlayer(), this.CollectableObj, (player, collectableObjectGame: CollectableSprite) => collectableObjectGame.Collectable.Collect(), null, this);
		
		this.events.on('UsedLadderPlaced', () => this.UsedLadder = new UsedLadder(this, 576, 156));
	}

	public update(): void {
		super.update();

		if (this.physics.overlap(this.GetPlayer(), this.UsedLadder)) {
			this.Library.body.enable = false;
		} else {
			this.Library.body.enable = true;
		}
	}
}