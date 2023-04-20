import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/modules/layout/MainLayout'
import MemberLayout from '@/modules/layout/MemberLayout'
import AdminLayout from '@/modules/layout/AdminLayout'

const routes = [
  {
    path: '/',
    name: 'mainLayout',
    component: MainLayout,
    children : [
    ]
  },
  {
    path: '/home',
    name: 'memberLayout',
    component: MemberLayout
  },
  {
    path: '/admin',
    name: 'adminLayout',
    component: AdminLayout
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router