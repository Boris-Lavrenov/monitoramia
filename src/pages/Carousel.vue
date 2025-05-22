<script>
export default {
	name: 'Carousel',
	data() {
		return {
			url: ['fp', 'imvd', 'fpk', 'dfo_Moskva', 'dfo'],
			interval: null,
			isLoading: true,
		}
	},
	created() {
		this.isLoading = false
		let counter = 0
		let index = 0
		setInterval(() => {
			console.log()
			index = counter % this.url.length
			this.$refs.monitoring.src = this.url[index]
			counter += 1
		}, 5000)
	},
	unmounted() {
		clearInterval(this.interval)
	},
}
</script>

<template>
	<iframe
		v-if="!isLoading"
		src="dfo"
		ref="monitoring"
		style="height: 99vh"
		width="100%"></iframe>
</template>

<style scoped></style>
