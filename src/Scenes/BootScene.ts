import Scene from './Scene';
import TutorialScene from './TutorialScene';
import InventoryScene from './InventoryScene';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import EndScene from './EndScene';
import PlayButton from '../Objects/PlayButton';

export default class BootScene extends Scene {
	private PlayButton: PlayButton;

	public constructor() {
		super('BootScene');
	}

	public preload(): void {
		// General assets
		this.load.spritesheet('player','assets/Player/playerSprite.png',{ frameWidth:60, frameHeight:96 });
		this.load.image('rightWall', 'assets/Scene1/rightWall.png');
		this.load.image('leftWall', 'assets/Scene1/leftWall.png');
		this.load.image('wallX', 'assets/Scene1/wallX.png');

		// Inventory assets
		this.load.image('inventoryBackground', 'assets/Inventory/inventoryBackground.png');
		this.load.image('fork-inventory', 'assets/Inventory/fork-inventory.png');
		this.load.image('crowbar-inventory', 'assets/Inventory/crowbar-inventory.png');
		this.load.image('tape-inventory', 'assets/Inventory/tape-inventory.png');
		this.load.image('plantSupport-inventory', 'assets/Inventory/plantSupport-inventory.png');
		this.load.image('ladder-inventory', 'assets/Inventory/ladder-inventory.png');
		this.load.image('book-inventory', 'assets/Inventory/book-inventory.png');
		this.load.image('envelope-inventory','assets/Inventory/envelope-inventory.png');
		this.load.image('logs-inventory','assets/Inventory/logs-inventory.png');
		this.load.image('hammer-inventory','assets/Inventory/hammer-inventory.png');
		this.load.image('blade-inventory','assets/Inventory/blade-inventory.png');
		this.load.image('glue-inventory','assets/Inventory/glue-inventory.png');
		this.load.image('stool-inventory', 'assets/Inventory/stool-inventory.png');
		this.load.image('keyPiece1-inventory', 'assets/Inventory/keyPiece1-inventory.png');
		this.load.image('keyPiece2-inventory', 'assets/Inventory/keyPiece2-inventory.png');
		this.load.image('keyPiece3-inventory', 'assets/Inventory/keyPiece3-inventory.png');
		this.load.image('sheet-inventory', 'assets/Inventory/sheet-inventory.png');
		this.load.image('key-inventory', 'assets/Inventory/key-inventory.png');
		this.load.image('plunger-inventory', 'assets/Inventory/plunger-inventory.png');
		this.load.image('knife-inventory', 'assets/Inventory/knife-inventory.png');

		// BootScene assets
		this.load.image('splashScreen','assets/BootScene/splashScreen.png');
		this.load.image('playButton', 'assets/BootScene/playButton.png');

		// TutorialScene assets
		this.load.image('tutorialDesk', 'assets/TutorialScene/tutorialDesk.png');
		this.load.image('bed', 'assets/TutorialScene/bed.png');
		this.load.image('unmadeBed', 'assets/TutorialScene/unmadeBed.png');
		this.load.image('keyPiece1', 'assets/TutorialScene/keyPiece1.png');
		this.load.image('keyPiece2', 'assets/TutorialScene/keyPiece2.png');
		this.load.image('sheet', 'assets/TutorialScene/sheet.png');
		this.load.image('paperToRead', 'assets/TutorialScene/paperToRead.png');
		this.load.image('door', 'assets/TutorialScene/door.png');
		this.load.image('tutorialFloor', 'assets/TutorialScene/tutorialFloor.png');
		this.load.image('carpet', 'assets/TutorialScene/carpet.png');
		this.load.image('foldedCarpet', 'assets/TutorialScene/foldedCarpet.png');
		this.load.image('message1', 'assets/TutorialScene/message1.png');
		this.load.image('message2', 'assets/TutorialScene/message2.png');
		this.load.image('message3', 'assets/TutorialScene/message3.png');
		this.load.image('message4', 'assets/TutorialScene/message4.png');
		this.load.image('message5', 'assets/TutorialScene/message5.png');
		this.load.image('message6', 'assets/TutorialScene/message6.png');
		this.load.image('message7', 'assets/TutorialScene/message7.png');
		this.load.image('message8', 'assets/TutorialScene/message8.png');
		this.load.image('message9', 'assets/TutorialScene/message9.png');

		// Scene1 assets
		this.load.image('bar', 'assets/Scene1/bar.png');
		this.load.image('library', 'assets/Scene1/library.png');
		this.load.image('desk', 'assets/Scene1/desk.png');
		this.load.image('couch', 'assets/Scene1/couch.png');
		this.load.image('chair', 'assets/Scene1/chair.png');
		this.load.image('ladder', 'assets/Scene1/ladder.png');
		this.load.image('book', 'assets/Scene1/book.png');
		this.load.image('plant', 'assets/Scene1/plant.png');
		this.load.image('plantSupport', 'assets/Scene1/plantSupport.png');
		this.load.image('floor', 'assets/Scene1/floor.png');
		this.load.image('victimLetter','assets/Scene1/victimLetter.png');
		this.load.image('kidnapperLetter','assets/Scene1/kidnapperLetter.png');
		this.load.image('envelope','assets/Scene1/envelope.png');

		// Scene2 assets
		this.load.image('basementStorage', 'assets/Scene2/basementStorage.png');
		this.load.image('button', 'assets/Scene2/button.png');
		this.load.image('brokenButton', 'assets/Scene2/brokenButton.png');
		this.load.image('logs', 'assets/Scene2/logs.png');
		this.load.image('electricMeter', 'assets/Scene2/electricMeter.png');
		this.load.image('workbench', 'assets/Scene2/workbench.png');
		this.load.image('axe', 'assets/Scene2/axe.png');
		this.load.image('blade', 'assets/Scene2/blade.png');
		this.load.image('hammer', 'assets/Scene2/hammer.png');
		this.load.image('smallLadder', 'assets/Scene2/smallLadder.png');
		this.load.image('floor2', 'assets/Scene2/floor2.png');
		this.load.image('table','assets/Scene2/table.png');
		this.load.image('screwdriver', 'assets/Scene2/screwdriver.png');
		this.load.image('glue', 'assets/Scene2/glue.png');
		this.load.image('stool', 'assets/Scene2/stool.png');

		// Scene3 assets
		this.load.image('islandChair','assets/Scene3/islandChair.png');
		this.load.image('cloggedSink','assets/Scene3/cloggedSink.png');
		this.load.image('sink','assets/Scene3/sink.png');
		this.load.image('sinkKnife','assets/Scene3/sinkKnife.png');
		this.load.image('airVent','assets/Scene3/airVent.png');
		this.load.image('island','assets/Scene3/island.png');
		this.load.image('cabinet','assets/Scene3/cabinet.png');
		this.load.image('counter','assets/Scene3/counter.png');
		this.load.image('floorTitle','assets/Scene3/floorTitle.png');
		this.load.image('emptyOven','assets/Scene3/emptyOven.png');
		this.load.image('openOven','assets/Scene3/openOven.png');
		this.load.image('lockedOven','assets/Scene3/lockedOven.png');
		this.load.image('kitchen','assets/Scene3/kitchen.png');

		// EndScene assets
		this.load.image('endBackground','assets/EndScene/endBackground.png');
		this.load.image('endText','assets/EndScene/endText.png');
	}

	public create(): void {
		// Adds all the Scenes.
		this.load.once('complete', () => {
			let tutorialScene = new TutorialScene();
			let scene1 = new Scene1();
			let scene2 = new Scene2();
			let scene3 = new Scene3();
			let endScene  = new EndScene();
			let inventoryScene = new InventoryScene(1248, 0);

			this.scene.add('TutorialScene', tutorialScene, false);
			this.scene.add('Scene1', scene1, false);
			this.scene.add('Scene2', scene2, false);
			this.scene.add('Scene3', scene3, false);
			this.scene.add('EndScene', endScene, false);
			this.scene.add('InventoryScene', inventoryScene, false);

			Scene.InventoryScene = inventoryScene;
		}, this);

		// Creates the background image.
		this.add.sprite(672, 480, 'splashScreen');

		// Creates the play button.
		this.PlayButton = new PlayButton(this, 1056, 768);
	}

	public update(): void {}
}