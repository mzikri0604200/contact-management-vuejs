<script setup>
import { useRoute } from 'vue-router';
import { addressDetail } from '../../lib/api/AddressApi';
import { useLocalStorage } from '@vueuse/core';
import { alertError } from '../../lib/alert';
import { onMounted, reactive, ref } from 'vue';
import AddressForm from '../AddressForm.vue';
const route = useRoute()
const { id, addressId } = route.params
const token = useLocalStorage('token', '')
const isLoading = ref(true)
const address = reactive({
	street: '',
	city: '',
	province: '',
	country: '',
	postal_code: ''
})

async function fetchAddress() {
	const response = await addressDetail(token.value, id, addressId)
	const responseBody = await response.json()

	if (response.status === 200) {
		address.street = responseBody.data.street
		address.city = responseBody.data.city
		address.province = responseBody.data.province
		address.country = responseBody.data.country
		address.postal_code = responseBody.data.postal_code

		isLoading.value = false
	} else {
		await alertError(responseBody.error)
		isLoading.value = false
	}
}

onMounted(async () => {
	await fetchAddress()
})
</script>

<template>
	<div v-if="isLoading" class="flex justify-center items-center h-64">
		<p>Loading address data...</p>
	</div>
	<AddressForm v-else :isUpdate="true" :data="address" />
</template>