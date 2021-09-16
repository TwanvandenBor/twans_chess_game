<template>
	<div id="timer-root">
		<section>
			<h2 id="timer-label">Timer</h2>
		</section>
		<section id="time-text-section">
			<span v-if="data.hour < 10">0</span>
			<span id="hours-label">{{ data.hour }}:</span>
			<span v-if="data.minute < 10">0</span>
			<span id="minutes-label">{{ data.minute }}:</span>
			<span v-if="data.seconds < 10">0</span>
			<span id="seconds-label">{{ data.seconds }}</span>
		</section>
	</div>
</template>


<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";

export default defineComponent({
  name: 'aboutTheBakeryView',
  props: {},
  setup() {
    const data = reactive({
		totalSeconds: 0,
		hour: 0,
		minute: 0,
		seconds: 0
    });

	function setTime() {
		data.totalSeconds++;

		data.hour = Math.floor(data.totalSeconds / 3600);
		data.minute = Math.floor((data.totalSeconds - data.hour*3600)/60);
		data.seconds = data.totalSeconds - (data.hour*3600 + data.minute*60);
	}

	onMounted(() => {
		window.setInterval(() => {
			setTime();
		}, 1000)
	});

    return {
		data
    };
  }
});
</script>

<style scoped lang="scss">
#timer-root {
	background-color: #763D1B;
	position: fixed;
	top: 17vh;
	left: 10vw;
	min-width: 222px;
	min-height: 66px;
	color: white;
	border-radius: 8px;

	#timer-label {
		color: white;
	}
}
</style>