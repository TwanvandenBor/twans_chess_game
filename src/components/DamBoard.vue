<template>
	<div id="damboard-root">
		<section 
			class="dam-tile-row"
			v-for="(damTileRow, damTileRowIndex) in damBoardHelper.getNumberOfTilesPerBoardRow()" :key="damTileRowIndex"
		>
        <dam-tile
          class="dam-tile"
          v-for="(damTile, damTileIndex) in damBoardHelper.getNumberOfTilesPerBoardRow()" :key="damTileIndex"
          :isWhite="damBoardHelper.getIsWhiteTileForCoordinate(damTileIndex, damTileRowIndex)"
          :damStone="damBoardHelper.getDamStoneForCoordinateIfAvailable(data.damStones, damBoardHelper.getDamStoneCoordinateFromXAndY(damTileIndex, damTileRowIndex))"
          :tileCoordinate="damBoardHelper.getBoardCoordinateFromXAndY(damTileIndex, damTileRowIndex)"
          :isStepPossibleForStoneOnTile="damBoardHelper.isOneStepWithoutHitInAnyDirectionPossibleForStone(data.damStones, damBoardHelper.getDamStoneForCoordinateIfAvailable(data.damStones, damBoardHelper.getDamStoneCoordinateFromXAndY(damTileIndex, damTileRowIndex)), data.isWhitePlayersTurn)"
          :isShowingPossibleStep="data.isShowingPossibleSteps && damBoardHelper.isTileCoordinatePossibleStepForSelectedDamStone(data.damStones, data.damStoneToShowPossibleStepsFor, damBoardHelper.getBoardCoordinateFromXAndY(damTileIndex, damTileRowIndex), data.isWhitePlayersTurn, props.areStonesInTopRowsWhite)"
          v-on:emitShowPossibleSteps="showPossibleSteps"
          v-on:emitMakeStepIfPossible="handlePlayerStepIfPossible"
        >
        </dam-tile>
      </section>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive, onMounted, getCurrentInstance } from "vue";
import DamTile from "@/components/DamTile.vue";
import { DamBoardHelper } from "@/helpers/DamBoardHelper";
import { DamStone } from "@/model/DamStone";
import { BoardCoordinate } from "@/model/BoardCoordinate";

export default defineComponent({
  name: 'damBoard',
  props: {
	areStonesInTopRowsWhite: { type: Boolean, default: true }
  },
  components: { 
    DamTile
  },
  setup(props) {
	const damBoardHelper = new DamBoardHelper();
	const app = getCurrentInstance();

    const data = reactive({
		damStones: damBoardHelper.getDamStonesForNewGameState(props.areStonesInTopRowsWhite),
		isShowingPossibleSteps: false,
		damStoneToShowPossibleStepsFor: {} as DamStone,
		isWhitePlayersTurn: true
    });

    function showPossibleSteps(damStone: DamStone): void {
		if(data.damStoneToShowPossibleStepsFor == damStone){
			data.isShowingPossibleSteps = !data.isShowingPossibleSteps;
		} else {
			data.isShowingPossibleSteps = true;
		}
		data.damStoneToShowPossibleStepsFor = damStone;
    }

    function isClickedTilePossibleStep(preferedStepCoordinate: BoardCoordinate): boolean {
		return damBoardHelper.isTileCoordinatePossibleStepForSelectedDamStone(
				data.damStones,
				data.damStoneToShowPossibleStepsFor,
				preferedStepCoordinate,
				data.isWhitePlayersTurn,
				props.areStonesInTopRowsWhite
			);
    }

    function updateDamStoneCoordinate(preferedStepCoordinate: BoardCoordinate): void {
		const indexOfStonesCoordinateBeforeStepIsTaken = data.damStones.findIndex((damStone: DamStone) => {
				return (
					damStone?.coordinate?.xPositionFromTopLeftOfBoard == data.damStoneToShowPossibleStepsFor?.coordinate?.xPositionFromTopLeftOfBoard &&
					damStone?.coordinate?.yPositionFromTopLeftOfBoard == data.damStoneToShowPossibleStepsFor?.coordinate?.yPositionFromTopLeftOfBoard
				);
		});

		if(!preferedStepCoordinate?.xPositionFromTopLeftOfBoard){ return; }
		if(!preferedStepCoordinate?.yPositionFromTopLeftOfBoard){ return; }

		data.damStones[indexOfStonesCoordinateBeforeStepIsTaken].coordinate.xPositionFromTopLeftOfBoard = preferedStepCoordinate.xPositionFromTopLeftOfBoard;
		data.damStones[indexOfStonesCoordinateBeforeStepIsTaken].coordinate.yPositionFromTopLeftOfBoard = preferedStepCoordinate.yPositionFromTopLeftOfBoard;
    }

    function handlePlayerStepIfPossible(preferedStepCoordinate: BoardCoordinate): void {
		if(isClickedTilePossibleStep(preferedStepCoordinate)){
			updateDamStoneCoordinate(preferedStepCoordinate);
			data.isWhitePlayersTurn = !data.isWhitePlayersTurn
		}
    }

    function restartGame(): void {
		data.damStones = damBoardHelper.getDamStonesForNewGameState();
		data.isShowingPossibleSteps = false;
		data.isWhitePlayersTurn = true;
    }

    onMounted(() => {
		app?.appContext?.config?.globalProperties?.$emitter.on('emitRestartGame', () => {
			restartGame();
		});
		app?.appContext?.config?.globalProperties?.$emitter.on('emitPauzeGame', () => {
			restartGame();
		});
    });

    return {
      data,
      props,
      damBoardHelper,
      showPossibleSteps,
      handlePlayerStepIfPossible
    };
  }
});
</script>

<style scoped lang="scss">
#damboard-root {
  position: fixed;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .dam-tile-row {
    display: flex;
    flex-direction: row;
  }
}
</style>