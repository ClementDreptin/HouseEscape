import Sprite from '../General/Sprite';
import Scene from '../Scenes/Scene';

export default class EchelleUtilisee extends Sprite {
	public constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'ladder');

		// Creates invisible blocks on each side of the ladder to prevent the player from getting inside the library
		let blockWidth = 12;
		let rightBlock = this.getBounds();
		rightBlock.x += rightBlock.width;
		rightBlock.width = blockWidth;
		
		let leftBlock = this.getBounds();
		leftBlock.width = blockWidth;
		leftBlock.x -= blockWidth;
		
		let rightBar = scene.add.rectangle(rightBlock.x, rightBlock.y, rightBlock.width, rightBlock.height);
		rightBar.setOrigin(0);
		let leftBar = scene.add.rectangle(leftBlock.x, leftBlock.y, leftBlock.width, leftBlock.height);
		leftBar.setOrigin(0);

		// Adds the blocks to the world's physics
		scene.physics.add.existing(rightBar, true);
		scene.add.existing(rightBar);
		scene.physics.add.existing(leftBar, true);
		scene.add.existing(leftBar);

		// Enables collision between the player and the blocks
		scene.CollisionObjInteract.add(rightBar);
		scene.CollisionObjInteract.add(leftBar);

		// Puts the player in front of the ladder (on the Z axis)
		scene.GetPlayer().depth = this.depth + 1;
	}
}