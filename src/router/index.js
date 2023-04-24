import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/modules/layout/MainLayout'
import MemberMainView from '@/modules/member/views/MemberMainView.vue'
import AdminLayout from '@/modules/layout/AdminLayout'
import MemberLayout from '@/modules/layout/MemberLayout'
import AdminStatisticsView from '@/modules/layout/admin/AdminStatisticsView.vue'
import ReportManagementView from '@/modules/layout/admin/ReportManagementView.vue'


const routes = [
  {
    path: '/',
    name: 'mainLayout',
    component: MainLayout
  },
  {
    path: '/home',
    name: 'memberLayout',
    component: MemberLayout,    
    children : [
      {
        path: '/home',
        name: 'memberMainView',
        component: MemberMainView
      }
    ]
  },
  {
    path: '/admin',
    name: 'adminLayout',
    component: AdminLayout,
    children: [
      {
        path: '/admin/statistics',
        name: 'statistics',
        component: AdminStatisticsView
      },
      {
        path: '/admin/ReportManagement',
        name: 'ReportManagement',
        component: ReportManagementView
      }

    ]
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router