import Scene from './Scene';
import CollectableProvider from '../General/CollectableProvider';
import DestroyableCollectableProvider from '../General/DestroyableCollectableProvider';
import DestroyableOnClickWithItem from '../General/DestroyableOnClickWithItem';
import AirVent from '../Objects/AirVent';
import Sprite from '../General/Sprite';

export default class Scene3 extends Scene {
	private OpenOven: DestroyableCollectableProvider;
	private LockedOven: DestroyableOnClickWithItem;

	public constructor() {
		super('Scene3');
	}

	public create() {
		super.create();

		// Creates the floor
		this.add.image(624, 480, 'floorTitle');

		this.CollisionObj.add(new Sprite(this, 576, 432, 'island'));
		this.CollisionObj.add(new Sprite(this, 480, 564, 'islandChair'));
		this.CollisionObj.add(new Sprite(this, 576, 564, 'islandChair'));
		this.CollisionObj.add(new Sprite(this, 672, 564, 'islandChair'));
		this.CollisionObj.add(new Sprite(this, 96, 336, 'counter'));
		this.CollisionObj.add(new Sprite(this, 96, 528, 'sink'));
		this.CollisionObj.add(new Sprite(this, 912, 108, 'emptyOven'));
		this.CollisionObj.add(new Sprite(this, 528, 108, 'kitchen'));


		this.CollisionObjInteract.add(new CollectableProvider(this, 576, 864, 'cabinet', 'key-inventory'));
		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 96, 528, 'sinkKnife', 'knife-inventory'));
		this.CollisionObjInteract.add(new DestroyableOnClickWithItem(this, 96, 528, 'cloggedSink', 'plunger-inventory'));
		
		this.OpenOven = new DestroyableCollectableProvider(this, 912, 108, 'openOven', 'plunger-inventory');
		this.OpenOven.body.setSize(192, 78);
		this.CollisionObjInteract.add(this.OpenOven);
		
		this.LockedOven = new DestroyableOnClickWithItem(this, 912, 108, 'lockedOven', 'key-inventory');
		this.LockedOven.body.setSize(192, 78);
		this.CollisionObjInteract.add(this.LockedOven);

		this.CollisionObjInteract.add(new AirVent(this, 1152, 60));

		super.addPlayerAndItsPhysics();

		this.GetPlayer().setPosition(970, 480);
	}
}