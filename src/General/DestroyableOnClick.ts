import InteractableSprite from './InteractableSprite';
import Scene from '../Scenes/Scene';

export default class DestroyOnClick extends InteractableSprite {
    public constructor(scene: Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
    }

    public OnGameObjectUp(): void {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.GetScene().GetPlayer().getBounds())) {
            this.destroy();
        }
    }
}