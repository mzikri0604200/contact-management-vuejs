

<script setup>
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
const router = useRouter();
const token = useLocalStorage('token', '')
if ( token.value === '' ) {
	router.push('/login')
} else {
	router.push('/dashboard/contacts')
}
</script>

<template>
  <div class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen w-full flex items-center justify-center p-4">
		<RouterView/>
	</div>
</template>
<style></style>
