<template>
	<div 
		class="dam-tile-root"
		:class="[
        (props.isWhite ? 'white-dam-tile' : 'black-dam-tile'),
        (props.isStepPossibleForStoneOnTile ? 'hoverable-tile-step-possible' : null)
        ]
      "
		:style="{
			minWidth: `${66 / props.maximumDamTilesPerRow}vh`,
			minHeight: `${66 / props.maximumDamTilesPerRow}vh`,
        }"
	>
		<section 
			class="dam-stone-drawing"
			:class="props.damStone ? (damStone?.isColorWhite ? 'white-dam-stone' : 'black-dam-stone') : null"
		>
		</section>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";
import { DamStone } from "@/model/DamStone";

export default defineComponent({
  name: 'aboutTheBakeryView',
  props: {
	isWhite: { type: Boolean, default: false },
	maximumDamTilesPerRow: { type: Number, default: 8 },
	damStone: { type: Object as () => DamStone },
	isStepPossibleForStoneOnTile: { type: Boolean, default: false }
  },
  setup(props) {
    const data = reactive({});

    return {
      data,
      props
    };
  }
});
</script>

<style scoped lang="scss">
.dam-tile-root {
	position: relative;
}

.white-dam-tile {
	background-color: white;
}
.black-dam-tile {
	background-color: #763D1B;
}

.hoverable-tile-step-possible:hover {
	background-color: lightblue;
}


.dam-stone-drawing {
	min-width: 66%;
	min-height: 66%;
	max-width: 66%;
	max-height: 66%;
	border-radius: 66%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.white-dam-stone {
	background-color: white;
}
.black-dam-stone {
	background-color: black;	
}
</style>