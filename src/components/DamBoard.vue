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
          :isStepPossibleForStoneOnTile="damBoardHelper.isOneStepWithoutHitInAnyDirectionPossibleForStone(data.damStones, damBoardHelper.getDamStoneForCoordinateIfAvailable(data.damStones, damBoardHelper.getDamStoneCoordinateFromXAndY(damTileIndex, damTileRowIndex)))"
          :isShowingPossibleStep="data.isShowingPossibleSteps && damBoardHelper.isTileCoordinatePossibleStepForSelectedDamStone(data.damStones, data.damStoneToShowPossibleStepsFor, damBoardHelper.getDamStoneCoordinateFromXAndY(damTileIndex, damTileRowIndex))"
          v-on:emitShowPossibleSteps="showPossibleSteps"
        >
        </dam-tile>
      </section>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";
import DamTile from "@/components/DamTile.vue";
import { DamBoardHelper } from "@/helpers/DamBoardHelper";
import { DamStone } from "@/model/DamStone";

export default defineComponent({
  name: 'damBoard',
  components: { 
    DamTile
  },
  props: {},
  setup() {
	const damBoardHelper = new DamBoardHelper();
    const data = reactive({
		damStones: damBoardHelper.getDamStonesForNewGameState(),
		isShowingPossibleSteps: false,
		damStoneToShowPossibleStepsFor: {} as DamStone
    });

    function showPossibleSteps(damStone: DamStone): void {
		if(data.damStoneToShowPossibleStepsFor == damStone){
			data.isShowingPossibleSteps = !data.isShowingPossibleSteps;
		} else {
			data.isShowingPossibleSteps = true;
		}
		data.damStoneToShowPossibleStepsFor = damStone;
    }

    return {
      data,
      damBoardHelper,
      showPossibleSteps
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