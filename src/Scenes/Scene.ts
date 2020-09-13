import InventoryScene from './InventoryScene';
import Sprite from '../General/Sprite';

export default class Scene extends Phaser.Scene {
	public CollisionObj: Phaser.Physics.Arcade.StaticGroup;
	public CollisionObjInteract: Phaser.Physics.Arcade.StaticGroup;
	public CollectableObj: Phaser.Physics.Arcade.StaticGroup;
	
	private Player: Phaser.Physics.Arcade.Sprite;
	private PlayerSpeed: number;

	static InventoryScene: InventoryScene;

	protected constructor(key: string) {
		super(key);
	}

	public create(): void {
		// Stores the static objects the player can collide with but not interact with.
		this.CollisionObj = this.physics.add.staticGroup();
		this.CollisionObj.add(new Sprite(this, 24, 480, 'leftWall'));
		this.CollisionObj.add(new Sprite(this, 1224, 480, 'rightWall'));
		this.CollisionObj.add(new Sprite(this, 624, 24, 'wallX')); // top wall
		this.CollisionObj.add(new Sprite(this, 624, 936, 'wallX')); // bottom wall

		// Stores the objects the player can collide and interact with.
		this.CollisionObjInteract = this.physics.add.staticGroup();

		// Stores the collectable objects.
		this.CollectableObj = this.physics.add.staticGroup();

		// Creates the player.
		this.Player = this.physics.add.sprite(672, 480, 'player', 3);

		// Enables collision between the player and the objects stored in this.CollisionObj ad this.CollisionObjInteract.
		this.physics.add.collider(this.Player, this.CollisionObj);
		this.physics.add.collider(this.Player, this.CollisionObjInteract);

		// Creates the animations.
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('player', { frames: [0, 1] }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { frames: [6, 7] }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('player', { frames: [4, 5] }),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('player', { frames: [2, 3] }),
			frameRate: 5,
			repeat: -1
		});

		this.PlayerSpeed = 300;
	}

	public update(): void {
		// Player's movements
		this.Player.setVelocity(0);

		if (this.input.keyboard.addKey('Q').isDown) {
			this.Player.setVelocityX(-this.PlayerSpeed);
		} else if (this.input.keyboard.addKey('D').isDown) {
			this.Player.setVelocityX(this.PlayerSpeed);
		}
		if (this.input.keyboard.addKey('Z').isDown) {
			this.Player.setVelocityY(-this.PlayerSpeed);
		} else if (this.input.keyboard.addKey('S').isDown) {
			this.Player.setVelocityY(this.PlayerSpeed);
		}

		if (this.input.keyboard.addKey('Q').isDown) {
			this.Player.anims.play('left', true);
		} else if (this.input.keyboard.addKey('D').isDown) {
			this.Player.anims.play('right', true);
		} else if (this.input.keyboard.addKey('Z').isDown) {
			this.Player.anims.play('up', true);
		} else if (this.input.keyboard.addKey('S').isDown) {
			this.Player.anims.play('down', true);
		} else {
			this.Player.anims.stop();
		}
	}

	protected addPlayerAndItsPhysics(): void {
		this.Player = this.physics.add.sprite(672, 480, 'player', 3);

		this.physics.add.collider(this.Player, this.CollisionObj);
		this.physics.add.collider(this.Player, this.CollisionObjInteract);
	}

	public GetPlayer(): Phaser.Physics.Arcade.Sprite {
		return this.Player;
	}
}