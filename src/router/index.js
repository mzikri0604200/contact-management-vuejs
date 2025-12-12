import { createRouter, createWebHistory } from 'vue-router';

import Layout from '../components/Layout.vue';
import UserRegister from '../components/user/UserRegister.vue';
import UserLogin from '../components/user/UserLogin.vue';
import DashboardLayout from '../components/DashboardLayout.vue';
import ContactList from '../components/contact/ContactList.vue';
import ContactCreate from '../components/contact/ContactCreate.vue';
import ContactEdit from '../components/contact/ContactEdit.vue';
import ContactDetail from '../components/contact/ContactDetail.vue';
import UserProfile from '../components/user/UserProfile.vue';
import UserLogout from '../components/user/UserLogout.vue';
import AddressCreate from '../components/address/AddressCreate.vue';
import AddressEdit from '../components/address/AddressEdit.vue';
import { useLocalStorage } from '@vueuse/core';

const token = useLocalStorage('token', '')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Layout,
      children: [
        {
          path: '/register',
          component: UserRegister,
        },
        {
          path: '/login',
          component: UserLogin,
        },
      ],
    },
    {
      component: DashboardLayout,
      path: '/dashboard',
      meta: {
        isAuth: true,
      },
      children: [
        {
          path: 'contacts',
          component: ContactList,
        },
        {
          path: 'contacts/create',
          component: ContactCreate,
        },
        {
          path: 'contacts/:id/edit',
          component: ContactEdit,
        },
        {
          path: 'contacts/:id',
          component: ContactDetail,
        },
        {
          path: 'contacts/:id/addresses/create',
          component: AddressCreate,
        },
        {
          path: 'contacts/:id/addresses/:addressId/edit',
          component: AddressEdit,
        },
        {
          path: 'users/profile',
          component: UserProfile,
        },
        {
          path: 'users/logout',
          component: UserLogout,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
	const token = localStorage.getItem('token')
	if (to.meta.isAuth && !token) {
    await router.push('/login');
  }
})

export default router;