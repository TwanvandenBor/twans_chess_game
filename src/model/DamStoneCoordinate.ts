import { BoardCoordinate } from "@/model/BoardCoordinate";

export class DamStoneCoordinate extends BoardCoordinate {
	constructor(
		public xPositionFromTopLeftOfBoard: number,
		public yPositionFromTopLeftOfBoard: number
	){
		super(xPositionFromTopLeftOfBoard, yPositionFromTopLeftOfBoard);
	}
}