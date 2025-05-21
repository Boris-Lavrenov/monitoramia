import { createRouter, createWebHistory } from 'vue-router'
import Monitoring from '@/pages/Monitoring.vue'

const routes = [
	{
		path: '/:facultyId',
		component: Monitoring,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
