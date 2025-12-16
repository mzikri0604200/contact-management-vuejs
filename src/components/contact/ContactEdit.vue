<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { alertError} from '../../lib/alert';
import { contactDetail } from '../../lib/api/ContactApi';
import ContactForm from '../ContactForm.vue';
import Loading from '../Loading.vue';

const route = useRoute();
const { id } = route.params;
const isLoading = ref(true)
const contact = reactive({
	first_name: '',
	last_name: '',
	email: '',
	phone: ''
})
const token = useLocalStorage('token', '')

async function fetchContact() {
	const response = await contactDetail(token.value, id)
	const responseBody = await response.json()
	console.log(responseBody);

	if(response.status === 200) {
		contact.first_name = responseBody.data.first_name
		contact.last_name = responseBody.data.last_name
		contact.email = responseBody.data.email
		contact.phone = responseBody.data.phone
		isLoading.value = false
	} else {
		await alertError(responseBody.error)
	}
}

onMounted(async () => {
	await fetchContact();
})
</script>

<template>
	<div v-if="isLoading">
		<Loading/>
	</div>
	<div v-else>
		<ContactForm :isUpdate="true" :data="contact"/>
	</div>

</template>
