import { DamStone } from "@/model/DamStone";
import { DamStoneCoordinate } from "@/model/DamStoneCoordinate";

export class DamBoardHelper {
	getNumberOfTilesPerBoardRow(): number {
		return 8;
	}

	getDamStoneCoordinateFromXAndY(x: number, y: number): DamStoneCoordinate {
		return new DamStoneCoordinate(x, y);
	}

	getIsWhiteTileForCoordinate(damTileRowIndex: number, damTileIndex: number): boolean {
		return !(
				(((damTileRowIndex % 2) == 0) && (damTileIndex % 2 == 0)) || 
				(((damTileRowIndex % 2) == 1) && (damTileIndex % 2 != 0))
			);
	}

	getDamStonesForNewGameState(areStonesInTopRowsWhite = false): DamStone[] {
		const damStones = [];

		for(const damboardRowNumber of Array(this.getNumberOfTilesPerBoardRow()).keys()){
			for(const damboardTileInRow of Array(this.getNumberOfTilesPerBoardRow()).keys()){

				// Fill first three rows
				if(damboardRowNumber < 3){
					if(!this.getIsWhiteTileForCoordinate(
						damboardRowNumber, damboardTileInRow)){

						const damStoneCoordinate = new DamStoneCoordinate(
							damboardRowNumber,
							damboardTileInRow
						);

						const isDamStoneWhite = areStonesInTopRowsWhite ? true : false;

						const damStone = new DamStone(
							damStoneCoordinate,
							false,
							isDamStoneWhite
						);

						damStones.push(damStone);
					}
				}

				// Fill last three rows
				if(damboardRowNumber >= (this.getNumberOfTilesPerBoardRow() - 3)){
					if(!this.getIsWhiteTileForCoordinate(
						damboardRowNumber, damboardTileInRow)){

						const damStoneCoordinate = new DamStoneCoordinate(
							damboardRowNumber,
							damboardTileInRow
						);

						const isDamStoneWhite = areStonesInTopRowsWhite ? false : true;

						const damStone = new DamStone(
							damStoneCoordinate,
							false,
							isDamStoneWhite
						);

						damStones.push(damStone);
					}
				}
			}
		}
		
		return damStones;
	}

	getDamStoneForCoordinateIfAvailable(damStones: DamStone[], damStoneCoordinate: DamStoneCoordinate): DamStone | null {
		let damStoneIfAvailable = null;

		damStones.forEach((damStone: DamStone) => {
			if(damStone?.coordinate?.xPositionFromTopLeftOfBoard == damStoneCoordinate?.xPositionFromTopLeftOfBoard &&
				damStone?.coordinate?.yPositionFromTopLeftOfBoard == damStoneCoordinate?.yPositionFromTopLeftOfBoard
				){
				damStoneIfAvailable = damStone;
			}
		});
		
		return damStoneIfAvailable;
	}

	getListOfCoordinatesOneStepFromCurrentCoordinate(coordinate: DamStoneCoordinate): DamStoneCoordinate[] {
		const listOfCoordinates: DamStoneCoordinate[] = [];
		const directions = [-1, 1];

		directions.forEach((horizontalDirector: number) => {
			directions.forEach((verticalDirector: number) => {
				const coordinateOneStepFromCurrent = new DamStoneCoordinate(
					coordinate?.xPositionFromTopLeftOfBoard + +horizontalDirector,
					coordinate?.yPositionFromTopLeftOfBoard + +verticalDirector,
				);

				listOfCoordinates.push(coordinateOneStepFromCurrent);
			});
		});
		return listOfCoordinates;
	}

	isCoordinateOutsidePlayerField(coordinate: DamStoneCoordinate): boolean {
		return (
				(coordinate?.xPositionFromTopLeftOfBoard < 0) ||
				(coordinate?.xPositionFromTopLeftOfBoard >= this.getNumberOfTilesPerBoardRow()) ||
				(coordinate?.yPositionFromTopLeftOfBoard < 0) ||
				(coordinate?.yPositionFromTopLeftOfBoard >= this.getNumberOfTilesPerBoardRow())
			);
	}

	isOtherStoneAlreadyOnCoordinate(allDamStones: DamStone[], damStoneCoordinate: DamStoneCoordinate): boolean {
		let isOtherStoneAlreadyOnCoordinate = false;

		allDamStones.forEach((damStone: DamStone) => {
			if(damStone?.coordinate?.xPositionFromTopLeftOfBoard == damStoneCoordinate?.xPositionFromTopLeftOfBoard &&
				damStone?.coordinate?.yPositionFromTopLeftOfBoard == damStoneCoordinate?.yPositionFromTopLeftOfBoard
				){
				isOtherStoneAlreadyOnCoordinate = true;
			}
		});
		
		return isOtherStoneAlreadyOnCoordinate;
	}

	isOneStepWithoutHitInAnyDirectionPossibleForStone(allDamStones: DamStone[], stone: DamStone): boolean {
		if(!stone?.coordinate){
			return false;
		}

		let isOneStepWithoutHitInAnyDirectionPossible = false;

		const coordinatesOneStepFromCurrentStone = 
			this.getListOfCoordinatesOneStepFromCurrentCoordinate(stone?.coordinate);

		coordinatesOneStepFromCurrentStone.forEach((coordinate: DamStoneCoordinate) => {
			if(
				!this.isCoordinateOutsidePlayerField(coordinate) &&
				!this.isOtherStoneAlreadyOnCoordinate(allDamStones, coordinate)
			){
				isOneStepWithoutHitInAnyDirectionPossible = true;
			}
		});
		return isOneStepWithoutHitInAnyDirectionPossible;
	}
}