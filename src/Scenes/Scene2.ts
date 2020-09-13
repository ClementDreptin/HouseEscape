import Scene from './Scene';
import Floor2 from '../Objects/Floor2';
import Stool from '../Objects/Stool';
import SmallLadder from '../Objects/SmallLadder';
import BrokenButton from '../Objects/BrokenButton';
import DestroyableCollectableProvider from '../General/DestroyableCollectableProvider';
import DestroyableOnClickWithItem from '../General/DestroyableOnClickWithItem';
import Sprite from '../General/Sprite';

export default class Scene2 extends Scene {
	private Floor: Floor2;
	private SmallLadder: SmallLadder;

	public constructor() {
		super('Scene2');
	}

	public create(): void {
		super.create();

		// Creates the floor
		this.Floor = new Floor2(this, 624, 480);

		this.CollisionObj.add(new Sprite(this, 1152,480, 'table'));
		this.CollisionObj.add(new Sprite(this, 624,864, 'workbench'));
		this.CollisionObj.add(new Sprite(this, 672,72, 'electricMeter'));
		this.CollisionObj.add(new Sprite(this, 384,168, 'basementStorage'));
		this.CollisionObj.add(new Sprite(this, 1146,480, 'screwdriver'));
		this.CollisionObj.add(new Sprite(this, 1146,576, 'axe'));

		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 336, 864, 'logs', 'logs-inventory'));
		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 720, 864, 'blade', 'blade-inventory'));
		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 1146, 384, 'hammer', 'hammer-inventory'));
		this.CollisionObjInteract.add(new DestroyableCollectableProvider(this, 432, 267, 'glue', 'glue-inventory'));
		this.CollisionObjInteract.add(new BrokenButton(this, 72, 480));
		this.CollisionObjInteract.add(new DestroyableOnClickWithItem(this, 72, 480, 'button', 'hammer-inventory'));

		super.addPlayerAndItsPhysics();
		
		this.events.on('StoolPlaced', () => {
			this.CollisionObjInteract.add(new Stool(this, 1056, 108));
			Stool.SmallLadderPlaced = true;
		});

		this.events.on('BrokenButtonPressed', () => {
			this.SmallLadder = new SmallLadder(this, 1056, 60);
		});
	}
}