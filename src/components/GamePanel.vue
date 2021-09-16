<template>
	<div id="game-panel-root">
		<section>
			<button 
				class="game-panel-button"
				@click="emitRestartGame()"
			>
				Restart Game
			</button>
			<button 
				class="game-panel-button"
				@click="emitPauzeGame()"
			>
				Pauze Game
			</button>		
		</section>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from "vue";

export default defineComponent({
  name: 'aboutTheBakeryView',
  props: {},
  setup() {
	const app = getCurrentInstance();

    const data = reactive({});

    function emitRestartGame(): void {
		app?.appContext?.config?.globalProperties?.$emitter.emit('emitRestartGame');
    }

    function emitPauzeGame(): void {
		app?.appContext?.config?.globalProperties?.$emitter.emit('emitPauzeGame');
    }

    return {
      data,
      emitRestartGame,
      emitPauzeGame
    };
  }
});
</script>

<style scoped lang="scss">
#game-panel-root {
	background-color: #763D1B;
	position: fixed;
	top: 17vh;
	right: 4vw;
	min-width: 344px;
	min-height: 100px;
	border-radius: 8px;
}

.game-panel-button {
	border: none;
	background: none;
	color: white;
	font-size: 22px;
	font-weight: bold;
	padding: 16px;
	width: 100%;
}
.game-panel-button:hover {
	background-color: #E5D3B3;
	border-radius: 8px;
}
</style>