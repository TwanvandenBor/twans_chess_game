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

	getDamStonesForNewGameState(areStonesInTopRowsBlack = false): DamStone[] {
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

						const isDamStoneBlack = areStonesInTopRowsBlack ? true : false;

						const damStone = new DamStone(
							damStoneCoordinate,
							false,
							isDamStoneBlack
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

						const isDamStoneBlack = areStonesInTopRowsBlack ? false : true;

						const damStone = new DamStone(
							damStoneCoordinate,
							false,
							isDamStoneBlack
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
}