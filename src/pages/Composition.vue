<script>
import HeadTable from '@/components/HeadTable.vue'
import { API } from '@/api/tableJson.js'

export default {
	name: 'Composition',
	components: { HeadTable },
	data() {
		return {
			myJson: '',
			institute_url: ['dfo', 'imvd', 'dfo_Moskva', 'fp', 'fpk'],
			url: [],
			previewJson: { education_form: '', institute: '', faculty_name: '', specialty_name: '' },
			isFP: false,
			date: '',
			time: '',
		}
	},
	methods: {
		async getJson(flag = false) {
			const response = await API.getJSON()
			this.myJson = response.data.data
			this.date = this.myJson.date
			this.time = this.myJson.time
			if (flag) {
				this.createUrlArray()
			}
		},
		createUrlArray() {
			for (let i = 0; i < this.institute_url.length; i++) {
				const faculties = this.myJson[this.institute_url[i]].body.educational_institution.faculties
				for (let j = 0; j < faculties.length; j++) {
					const faculty = faculties[j]
					for (let k = 0; k < faculty.specialties.length; k++) {
						this.url.push({ faculty: this.institute_url[i], query: { faculty: j, specialty: k } })
					}
				}
			}
			this.createPreview(12)
		},
		interval() {
			let counter = 0
			let index = 0
			setInterval(() => {
				if (counter % this.url.length === 0) {
					this.getJson()
				}
				index = counter % this.url.length
				// this.createPreview(index)
				counter += 1
			}, 1000)
		},
		createPreview(index = 0) {
			const parse = this.myJson[this.url[index].faculty]
			this.isFP = this.url[index].faculty == 'fp' ? true : false
			this.previewJson.institute = parse.body.educational_institution.educational_institution_title
			this.previewJson.education_form = parse.head.education_form
			this.previewJson.faculty_name = parse.body.educational_institution.faculties[this.url[index].query.faculty].faculty_name
			this.previewJson.specialty_name = this.createSpecialName(
				parse.body.educational_institution.faculties[this.url[index].query.faculty].specialties[this.url[index].query.specialty].specialty_name
			)
			this.previewJson.plans = {
				...parse.body.educational_institution.faculties[this.url[index].query.faculty].specialties[this.url[index].query.specialty].specialty_data,
			}
		},
		createSpecialName(text) {
			const index = text.indexOf('(')
			if (index > -1) {
				return { name: text.slice(0, index - 1), interests: text.slice(index + 1, text.length - 1) }
			} else {
				return { name: text, interests: '' }
			}
		},
	},
	mounted() {
		this.interval()
	},
	created() {
		this.getJson(true)
	},
	computed: {
		isLoadPage() {
			return false
		},
	},
}
</script>

<template>
	<div class="d-flex flex-column">
		<div class="w-100 text-center p-2 myBg">
			<h3>Информация о ходе приема документов в {{ previewJson.institute }}</h3>
		</div>
		<div class="pt-3">
			<h1 class="tdHead myColorRed-700 text-center">
				<strong v-if="!isFP">{{ previewJson.faculty_name }}</strong>
				<strong v-else>Факультет права</strong>
			</h1>
		</div>
		<div class="text-center">
			<h2 style="font-size: 2.6rem">
				специальность «<strong class="myColorRed-700 tdHead">{{ previewJson.specialty_name.name }}</strong
				>»
			</h2>
			<h2>{{ previewJson.specialty_name.interests }}</h2>
		</div>
		<div class="w-100 p-3 text-end">
			<h4>
				<span
					>Форма получения образования - <strong>{{ previewJson.education_form }}</strong></span
				>
			</h4>
		</div>
		<div class="myColorRed p-2">
			<div v-if="!isFP">
				<h2><strong>План приема:</strong></h2>
				<h2 v-for="(person, key, index) in previewJson.plans">
					<span>
						{{ key }} -
						<strong>{{ person['План приема'] }}</strong>
					</span>
				</h2>
			</div>
			<div v-else>
				<h2>
					<strong>План приема - </strong>
					<strong v-for="person in previewJson.plans"> {{ person['План приема'] }}</strong>
				</h2>
			</div>
		</div>
	</div>
	<div></div>
</template>

<style scoped>
.tdHead {
	text-transform: uppercase;
}
</style>
