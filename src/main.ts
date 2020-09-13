import * as Phaser from 'phaser';
import BootScene from './Scenes/BootScene'
const bootScene = new BootScene();

const config: Phaser.Types.Core.GameConfig = {
	width: 1344,
	height: 960,
	scale: {
		mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH
	},
	type: Phaser.AUTO,
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: bootScene
};

export const game = new Phaser.Game(config);