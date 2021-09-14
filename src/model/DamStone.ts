import { DamStoneCoordinate } from "@/model/DamStoneCoordinate";

export class DamStone {
	constructor(
		public coordinate: DamStoneCoordinate,
		public isDam: boolean,
		public isColorWhite: boolean
	){}
}