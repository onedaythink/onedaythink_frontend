import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/modules/layout/MainLayout'
import MemberMainView from '@/modules/member/views/MemberMainView'
import AdminLayout from '@/modules/layout/AdminLayout'
import MemberLayout from '@/modules/layout/MemberLayout'
import SignUpView from '@/modules/member/views/SignUpView.vue'
import MainView from '@/modules/member/views/MainView.vue'
import LoginView from '@/modules/member/views/LoginView'
import OtherOpinionView from '@/modules/others/views/OtherOpinionView'
import ChatWithOtherView from '@/modules/chat/views/ChatWithOtherView'

const routes = [
  {
    path: '/',
    name: 'mainLayout',
    component: MainLayout,
    children:[
      {
        path: '/',
        name: 'mainView',
        component: MainView
      },
      {
        path: '/signup',
        name: 'signUpView',
        component: SignUpView
      },
      {
        path: '/login',
        name: 'loginView',
        component: LoginView
      }
    ]
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
      },
      {
        path: '/others',
        name: 'otherOpinionView',
        component: OtherOpinionView
      },
      {
        path: '/chatwithother',
        name: 'chatWithOtherView',
        component: ChatWithOtherView
      }
    ]
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