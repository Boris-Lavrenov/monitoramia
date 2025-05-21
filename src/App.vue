<script>
import { API } from '@/api/tableJson.js'
import HeadTable from '@/components/HeadTable.vue'

export default {
	components: { HeadTable },
}
</script>

<template>
	<router-view></router-view>
</template>

<style>
* {
	margin: 0px;
	padding: 0;
	box-sizing: border-box;
}
</style>
