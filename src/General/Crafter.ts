import InventoryScene from '../Scenes/InventoryScene';
import Collectable from './Collectable';
import { Slot } from './Inventory';

interface Possibility {
	sources: string[];
	target: string;
}

export default class Crafter {
	private Possibilties: Possibility[];

	public constructor(possibilties: Possibility[] = []) {
		this.Possibilties = possibilties;
	}
	
	public Add(possibility: Possibility): void {
		this.Possibilties.push(possibility);
	}
	
	public Try(inventoryScene: InventoryScene): string {
		let inventory = inventoryScene.GetInventory();
		let selection = inventory.GetSelectedSlots();
		let keyInInventory: string;

		this.Possibilties.forEach(possibility => {
			let found = possibility.sources.map((source: string) => selection.find((slot: Slot) => slot.collectable.GetKeyInInventory() === source));

			if (found.findIndex(slot => slot === undefined) === -1) {
				found.forEach((slot: Slot) => inventory.DeleteElementAt(slot.index));

				let composed = new Collectable(inventoryScene, possibility.target);
				composed.Collect();
				keyInInventory = composed.GetKeyInInventory();
			}
		});

		return keyInInventory;
	}
}