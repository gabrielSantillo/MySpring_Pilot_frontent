import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/user/LoginView.vue'
import StudentView from '@/views/student/StudentView.vue'
import AppointmentView from '@/views/appointment/AppointmentView.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: LoginPage
  },

  {
    path: '/student',
    component: StudentView
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
