<template>
	<div id="damboard-root">
		<section 
        class="dam-tile-row"
        v-for="(damTileRow, damTileRowIndex) in damBoardHelper.getNumberOfTilesPerBoardRow()" :key="damTileRowIndex"
      >
        <dam-tile
          class="dam-tile"
          v-for="(damTile, damTileIndex) in damBoardHelper.getNumberOfTilesPerBoardRow()" :key="damTileIndex"
          :isWhite="damBoardHelper.getIsWhiteTileForCoordinate(damTileRowIndex, damTileIndex)"
          :damStone="damBoardHelper.getDamStoneForCoordinateIfAvailable(data.damStones, damBoardHelper.getDamStoneCoordinateFromXAndY(damTileRowIndex, damTileIndex))"
        >
        </dam-tile>
      </section>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";
import DamTile from "@/components/DamTile.vue";
import { DamBoardHelper } from "@/helpers/DamBoardHelper";

export default defineComponent({
  name: 'damBoard',
  components: { 
    DamTile
  },
  props: {},
  setup() {
	const damBoardHelper = new DamBoardHelper();
    const data = reactive({
		damStones: damBoardHelper.getDamStonesForNewGameState()
    });

    return {
      data,
      damBoardHelper
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