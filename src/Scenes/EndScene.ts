import Scene from './Scene';

export default class EndScene extends Scene {
	public constructor() {
		super('EndScene');
	}

	public create(): void {
		// Creates the ending background
		this.add.image(672, 480, 'endBackground');

		// Makes the ending message appear after 5 seconds.
		setTimeout(() => this.add.image(672, 480, 'endText'), 5000);
	}

	public update(): void {}
}