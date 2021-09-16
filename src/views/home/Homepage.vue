<template>
	<div id="homepage-root">
    <section id="chess-image-section">
      <img 
        id="chess-game-image"
        src="@/assets/images/chess1.jpg" 
        :alt="$t('chess_image_alt_description')"
      >
    </section>

    <timer></timer>
    <dam-board></dam-board>

	</div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";
import DamBoard from "@/components/DamBoard.vue";
import Timer from "@/components/Timer.vue";

export default defineComponent({
  name: 'homepage',
  components: {
    Timer,
    DamBoard
  },
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
#homepage-root {
  position: relative;
}

#chess-image-section {
  position: fixed;
  #chess-game-image {
    object-fit: cover;
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
  }
}
</style>