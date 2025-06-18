<script>
import HeadTable from '@/components/HeadTable.vue'
import { API } from '@/api/tableJson.js'

export default {
	name: 'Monitoring',
	components: { HeadTable },
	data() {
		return {
			isFP: false,
			url: '',
			myJson: {},
			date: '',
			time: '',
			count: 0,
			points: '',
			myHead: '',
			myBody: '',
		}
	},
	methods: {
		async getJson() {
			const response = await API.getJSON()
			this.myJson = response.data.data
			this.date = this.myJson.date
			this.time = this.myJson.time
			this.points = this.myJson.range
			this.count = this.points.length + 4
			const url = this.$route.params.facultyId
			this.isFP = url === 'fp' ? true : false
			this.myJson = this.myJson[url]
			this.myHead = this.myJson.head
			this.myBody = this.myJson.body.educational_institution
		},
		nullOrValue(value) {
			return value ? value : ''
		},
		countPerson(object) {
			return Object.keys(object).length
		},
		isEmpty(text) {
			return text.toLowerCase() === 'empty' ? ' ' : text
		},
	},
	computed: {
		getCountHeadFirst() {
			return this.count
		},
		getCountHeadSecond() {
			return this.count - 4
		},
		isLoadPage() {
			if (!this.myJson) {
				return true
			} else if (!this.myHead) {
				return true
			} else if (!this.myBody) {
				return true
			}
		},
	},
	created() {
		this.getJson()
	},
}
</script>

<template>
	<div class="app">
		<div v-if="isLoadPage"><h1>404</h1></div>
		<div v-else>
			<HeadTable
				:time="time"
				:date="date"
				:head="myHead"
				:is-fp="isFP" />
			<table class="table-bordered text-center">
				<thead style="cursor: default; vertical-align: middle">
					<tr>
						<td
							style="width: 8%"
							rowspan="3">
							Фаультет, специальность
						</td>
						<td
							style="width: 5%"
							rowspan="3"
							class="vertical-text">
							Категория абитуриентов
						</td>
						<td
							style="width: 3%"
							rowspan="3"
							class="vertical-text">
							План приема
						</td>
						<td
							:colspan="getCountHeadFirst"
							class="tdHead">
							<strong>
								<h6>Подано заявлений от абитуриентов</h6>
							</strong>
						</td>
					</tr>
					<tr>
						<td
							rowspan="2"
							class="vertical-text">
							Всего
						</td>
						<td colspan="3">в том числе</td>
						<td :colspan="getCountHeadSecond">с суммой набранных баллов для конкурсного зачисления</td>
					</tr>
					<tr>
						<td class="vertical-text">без экзаменов</td>
						<td class="vertical-text">вне конкурса</td>
						<td class="tdHead vertical-text">по конкурсу</td>
						<td
							class="p-0 py-1 vertical-text"
							v-for="point in points"
							:key="point">
							{{ point }}
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<!--Учреждение-->
						<td :colspan="getCountHeadFirst + 3">
							<h3>
								<strong>
									{{ myBody.educational_institution_title }}
								</strong>
							</h3>
						</td>
					</tr>
					<tr v-if="isFP">
						<td :colspan="getCountHeadFirst + 3">
							<h3>
								<strong class="tdHead"> Факультет права</strong>
							</h3>
						</td>
					</tr>
					<template v-for="facultiy in myBody.faculties">
						<tr>
							<td :colspan="getCountHeadFirst + 3">
								<h4>
									<strong class="tdHead">{{ facultiy.faculty_name }}</strong>
								</h4>
							</td>
						</tr>
						<template v-for="special in facultiy.specialties">
							<tr
								class="trClass"
								v-for="(person, person_key, index) in special.specialty_data">
								<td
									:rowspan="countPerson(special.specialty_data)"
									v-if="index === 0">
									<h4>{{ special.specialty_name }}</h4>
								</td>
								<td style="vertical-align: middle">
									<strong>{{ isEmpty(person_key) }}</strong>
								</td>
								<td
									style="vertical-align: middle"
									class="fw-bold">
									<h4>{{ person['План приема'] }}</h4>
								</td>
								<td style="vertical-align: middle">
									<h5>{{ person['Всего'] }}</h5>
								</td>
								<td style="vertical-align: middle">
									<h5>{{ person['Без экзаменов'] }}</h5>
								</td>
								<td style="vertical-align: middle">
									<h5>{{ person['Вне конкурса'] }}</h5>
								</td>
								<td style="vertical-align: middle">
									<h4>{{ person['По конкурсу'] }}</h4>
								</td>
								<td
									style="vertical-align: middle"
									v-for="point in points">
									{{ person['scores'][point] }}
								</td>
							</tr>
						</template>
					</template>
				</tbody>
			</table>
			<text></text>
		</div>
	</div>
</template>

<style scoped>
.app {
	margin: 20px 30px;
}

.tdHead {
	text-transform: uppercase;
}

.vertical-text {
	background-color: inherit !important;
	transform: rotate(-180deg);
	writing-mode: vertical-rl;
}

table {
	overflow: hidden;
}

.trClass:hover {
	background-color: #ffa;
}

.trClass > td,
th {
	position: relative;
}

.trClass > td:hover::after,
th:hover::after {
	content: '';
	position: absolute;
	background-color: #ffa;
	left: 0;
	top: -5000px;
	height: 10000px;
	width: 100%;
	z-index: -1;
}

td {
	padding: 5px;
}
</style>
