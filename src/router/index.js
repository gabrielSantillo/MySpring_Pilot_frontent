import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/user/LoginPage.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: LoginPage
  }

]

const router = new VueRouter({
  routes
})

export default router
