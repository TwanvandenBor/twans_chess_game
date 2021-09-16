import { DamStone } from "@/model/DamStone";
import { BoardCoordinate } from "@/model/BoardCoordinate";
import { DamStoneCoordinate } from "@/model/DamStoneCoordinate";

export class DamBoardHelper {
	getNumberOfTilesPerBoardRow(): number {
		return 8;
	}

	getBoardCoordinateFromXAndY(x: number, y: number): BoardCoordinate {
		return new BoardCoordinate(x, y);
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

	isStoneTryToMoveStepBackwards(currentStone: DamStone, movingToCoordinate: BoardCoordinate, areStonesInTopRowsWhite: boolean): boolean {
		if(areStonesInTopRowsWhite){
			if(
				currentStone?.isColorWhite &&
				movingToCoordinate?.yPositionFromTopLeftOfBoard < currentStone?.coordinate?.yPositionFromTopLeftOfBoard
			){
				return true;
			} else if(
				!currentStone?.isColorWhite &&
				movingToCoordinate?.yPositionFromTopLeftOfBoard > currentStone?.coordinate?.yPositionFromTopLeftOfBoard
			){
				return true;
			}
		} else {
			if(
				currentStone?.isColorWhite &&
				movingToCoordinate?.yPositionFromTopLeftOfBoard > currentStone?.coordinate?.yPositionFromTopLeftOfBoard
			){
				return true;
			} else if(
				!currentStone?.isColorWhite &&
				movingToCoordinate?.yPositionFromTopLeftOfBoard < currentStone?.coordinate?.yPositionFromTopLeftOfBoard
			){
				return true;
			}
		}
		return false;
	}

	isTileCoordinatePossibleStepForSelectedDamStone(damStones: DamStone[], damStoneToShowPossibleStepsFor: DamStone, tileCoordinateToPossiblyStepTo: BoardCoordinate, isWhitePlayersTurn: boolean, areStonesInTopRowsWhite: boolean): boolean {
		if(!damStoneToShowPossibleStepsFor?.coordinate){ return false; }
		if(damStoneToShowPossibleStepsFor?.isColorWhite != isWhitePlayersTurn){ return false; }

		// Validate step backwards if stone is NOT a dam
		if(!damStoneToShowPossibleStepsFor?.isDam){
			if(
				this.isStoneTryToMoveStepBackwards(
					damStoneToShowPossibleStepsFor,
					tileCoordinateToPossiblyStepTo,
					areStonesInTopRowsWhite
				)
			){
				return false;
			}
		}

		const possibleCoordinatesToStepToFromSelectedDamStone = this.getListOfPossibleStepCoordinatesOneStepFromCurrentCoordinate(damStoneToShowPossibleStepsFor?.coordinate)
			.filter((damStoneCoordinate: DamStoneCoordinate) => {
			return (
				!this.isCoordinateOutsidePlayerField(damStoneCoordinate) &&
				!this.isOtherStoneAlreadyOnCoordinate(damStones, damStoneCoordinate) 
			);
		});

		const isPossibleCoordinateTileCoordinateToPossiblyStepTo = possibleCoordinatesToStepToFromSelectedDamStone.find((coordinate: DamStoneCoordinate) => {
			return (
				coordinate?.xPositionFromTopLeftOfBoard == tileCoordinateToPossiblyStepTo?.xPositionFromTopLeftOfBoard &&
				coordinate?.yPositionFromTopLeftOfBoard == tileCoordinateToPossiblyStepTo?.yPositionFromTopLeftOfBoard
			);
        });

		if(isPossibleCoordinateTileCoordinateToPossiblyStepTo){
			return true;
		} else {
			return false;
		}
	}

	getDamStonesForNewGameState(areStonesInTopRowsWhite = false): DamStone[] {
		const damStones = [];

		for(const damboardRowNumber of Array(this.getNumberOfTilesPerBoardRow()).keys()){
			for(const damboardTileInRow of Array(this.getNumberOfTilesPerBoardRow()).keys()){

				// Fill first three rows
				if(damboardTileInRow < 3){
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
				if(damboardTileInRow >= (this.getNumberOfTilesPerBoardRow() - 3)){
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

		const filteredDamStones = damStones.filter((damStone: DamStone) => {
			return !(damStone?.coordinate?.yPositionFromTopLeftOfBoard > 2 && !damStone?.isColorWhite) &&
			!((damStone?.coordinate?.yPositionFromTopLeftOfBoard < (this.getNumberOfTilesPerBoardRow() - 3)) && damStone?.isColorWhite)
		});
		
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

	getListOfPossibleStepCoordinatesOneStepFromCurrentCoordinate(coordinate: DamStoneCoordinate): DamStoneCoordinate[] {
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

	isOneStepWithoutHitInAnyDirectionPossibleForStone(allDamStones: DamStone[], stone: DamStone, isWhitePlayersTurn: boolean): boolean {
		if(!stone?.coordinate){ return false; }
		if(stone?.isColorWhite != isWhitePlayersTurn){ return false; }

		let isOneStepWithoutHitInAnyDirectionPossible = false;

		const coordinatesOneStepFromCurrentStone = 
			this.getListOfPossibleStepCoordinatesOneStepFromCurrentCoordinate(stone?.coordinate);

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