import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/user/LoginView.vue'
import StudentView from '@/views/student/StudentView.vue'
import AppointmentView from '@/views/appointment/AppointmentView.vue'
import CollegeView from '@/views/college/CollegeView.vue'
import ProgramView from '@/views/programs/ProgramView.vue'
import VisaView from '@/views/visa/VisaView.vue'

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
  },

  {
    path: '/college',
    component: CollegeView
  },

  {
    path: '/programs',
    component: ProgramView
  },

  {
    path: '/visa',
    component: VisaView
  }

]

const router = new VueRouter({
  routes
})

export default router
