<template>
	<div 
		class="dam-tile-root"
		:class="props.isWhite ? 'white-dam-tile' : 'black-dam-tile'"
		:style="{
			minWidth: `${66 / props.maximumDamTilesPerRow}vh`,
			minHeight: `${66 / props.maximumDamTilesPerRow}vh`,
        }"
	>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: 'aboutTheBakeryView',
  props: {
	isWhite: { type: Boolean, default: false },
	maximumDamTilesPerRow: { type: Number, default: 8 }
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
.white-dam-tile {
	background-color: white;
}
.black-dam-tile {
	background-color: black;
}
</style>