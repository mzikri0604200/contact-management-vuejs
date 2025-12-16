<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import { contactCreate, contactUpdate } from '../lib/api/ContactApi';
import { alertError, alertSuccess } from '../lib/alert';
const router = useRouter()
const route = useRoute()
const { id } = route.params
const token = useLocalStorage("token", "")
const props = defineProps({
	isUpdate: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object
	}
})

const dataContact = reactive({
	first_name: '',
	last_name: '',
	email: '',
	phone: ''
})

async function handleCreate() {
	const response = await contactCreate(token.value, dataContact)
	const responseBody = await response.json()
	console.log(responseBody);
	
	if (response.status === 200) {
		await alertSuccess('Contact created successfully')
		await router.push({
			path: '/dashboard/contacts'
		})
	} else {
		await alertError(responseBody.errors)
	}
}

async function handleUpdate() {
	const response = await contactUpdate(token.value, id, dataContact)
	const responseBody = await response.json()
	console.log(responseBody);

	if (response.status === 200) {
		await alertSuccess('Contact updated successfully')
	} else {
		await alertError(responseBody.errors)
	}
}

async function handleSubmit() {
	if (props.isUpdate) {
		handleUpdate()
	} else {
		handleCreate()
	}
}

async function initializeForm() {
	if (props.isUpdate && props.data) {
		const contactList = props.data;
		console.log(props.data)

		if (contactList) {
			dataContact.first_name = contactList.first_name;
			dataContact.last_name = contactList.last_name;
			dataContact.email = contactList.email;
			dataContact.phone = contactList.phone;
		}
	}
};

onMounted(async () => {
	await initializeForm();
})
</script>

<template>
	<div class="flex items-center mb-6">
		<RouterLink to="/dashboard/contacts"
			class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
			<i class="fas fa-arrow-left mr-2"></i> Back to Contacts
		</RouterLink>
		<h1 class="text-2xl font-bold text-white flex items-center">
			<i :class="`fas ${isUpdate ? 'fa-user-edit' : 'fa-user-plus'} text-blue-400 mr-3`"></i> {{ isUpdate ? 'Edit' : 'Create New' }} Contact
		</h1>
	</div>

	<div
		class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
		<div class="p-8">
			<form @submit.prevent="handleSubmit">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
					<div>
						<label for="first_name" class="block text-gray-300 text-sm font-medium mb-2">First Name</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<i class="fas fa-user-tag text-gray-500"></i>
							</div>
							<input type="text" id="first_name" name="first_name"
								class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
								placeholder="Enter first name" required v-model="dataContact.first_name">
						</div>
					</div>
					<div>
						<label for="last_name" class="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<i class="fas fa-user-tag text-gray-500"></i>
							</div>
							<input type="text" id="last_name" name="last_name"
								class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
								placeholder="Enter last name" required v-model="dataContact.last_name">
						</div>
					</div>
				</div>

				<div class="mb-5">
					<label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i class="fas fa-envelope text-gray-500"></i>
						</div>
						<input type="email" id="email" name="email"
							class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
							placeholder="Enter email address" required v-model="dataContact.email">
					</div>
				</div>

				<div class="mb-6">
					<label for="phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i class="fas fa-phone text-gray-500"></i>
						</div>
						<input type="tel" id="phone" name="phone"
							class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
							placeholder="Enter phone number" required v-model="dataContact.phone">
					</div>
				</div>

				<div class="flex justify-end space-x-4">
					<RouterLink to="/dashboard/contacts"
						class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
						<i class="fas fa-times mr-2"></i> Cancel
					</RouterLink>
					<button type="submit"
						class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
						<font-awesome-icon :icon="`fa-solid ${isUpdate ? 'fa-save' : 'fa-plus-circle'}`"
							class="mr-2" />  {{ isUpdate ? 'Save Changes' : 'Create Contact' }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>