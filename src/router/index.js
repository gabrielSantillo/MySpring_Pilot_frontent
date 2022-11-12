import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/user/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import AppointmentView from '@/views/appointment/AppointmentView.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: LoginPage
  },

  {
    path: '/dashboard',
    component: DashboardView
  },

  {
    path: '/appointment',
    component: AppointmentView
  }

]

const router = new VueRouter({
  routes
})

export default router
