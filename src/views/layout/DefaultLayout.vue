<template>
	<div class="main-view-wrapper">
		<router-view></router-view>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: 'defaultLayout',
  props: {},
  setup() {
    const data = reactive({});

    return {
      data
    };
  }
});
</script>

<style scoped lang="scss">
.main-view-wrapper {
	width: 100vw;
	min-width: 100vw;
	height: 100vh;
	min-height: 100vh;
	max-height: 100vh;
	margin: 0;
}
</style>