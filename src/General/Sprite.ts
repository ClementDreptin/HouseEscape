import Scene from '../Scenes/Scene';

export default class Sprite extends Phaser.GameObjects.Sprite {
	private Scene: Scene;

	/**
	 * Had to explicitly define the type of Phaser.GameObjects.Sprite.body because TypeScript
	 * couldn't figure it out itself for some reason
	 */
	public body: Phaser.Physics.Arcade.Body;

	public constructor(scene: Scene, x: number, y: number, key: string) {
		super(scene, x, y, key);

		// Adds the Sprite to the World's physics
		scene.physics.add.existing(this, true);
		scene.add.existing(this);

		// Holds a reference to the current scene;
		this.Scene = scene;

		/**
		 * The following code takes 45 pixels at the bottom the Sprite's body to allow the player
		 * to overlap the bottom of the Sprite but only on 45 pixels to create a perspective illusion
		 */
		const verticalBodyOffset = 45;

		if (this.body.height > verticalBodyOffset * 2) {
			this.body.setSize(this.body.width, this.body.height - verticalBodyOffset);
			this.body.setOffset(0, 0);
		}
	}

	public GetScene(): Scene {
		return this.Scene;
	}
}