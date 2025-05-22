import { createRouter, createWebHistory } from 'vue-router'
import Monitoring from '@/pages/Monitoring.vue'
import Carousel from '@/pages/Carousel.vue'

const routes = [
	{
		path: '/',
		component: Carousel,
	},

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
