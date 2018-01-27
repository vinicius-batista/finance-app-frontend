'use strict'

import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import Dashboard from '@/components/Dashboard.vue'
import Profile from '@/components/Profile.vue'
import Settings from '@/components/Settings.vue'
import Logout from '@/components/Logout.vue'

export default [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      auth: false,
      title: 'Finance app'
    }
  },
  {
    name: 'auth.login',
    path: '/login',
    component: Login,
    meta: {
      auth: false,
      title: 'Login - Finance app'
    }
  },
  {
    name: 'auth.register',
    path: '/register',
    component: Register,
    meta: {
      auth: false,
      title: 'Register - Finance app'
    }
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      auth: true,
      title: 'Dashboard - Finance app'
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    meta: {
      auth: true,
      title: 'Profile - Finance app'
    }
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
    meta: {
      auth: true,
      title: 'Settings - Finance app'
    }
  },
  {
    name: 'logout',
    path: '/logout',
    component: Logout,
    meta: {
      auth: true,
      title: 'Logout - Finance app'
    }
  }
]
