import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/modules/layout/MainLayout'
import MemberMainView from '@/modules/member/views/MemberMainView'
import AdminLayout from '@/modules/layout/AdminLayout'
import MemberLayout from '@/modules/layout/MemberLayout'
import AdminStatisticsView from '@/modules/admin/views/AdminStatisticsView'
import AdminReportView from '@/modules/admin/views/AdminReportView'
import AdminSubjectView from '@/modules/admin/views/AdminSubjectView'
import SignUpView from '@/modules/member/views/SignUpView.vue'
import MainView from '@/modules/member/views/MainView.vue'
import LoginView from '@/modules/member/views/LoginView'
import OtherOpinionView from '@/modules/others/views/OtherOpinionView'
import MyPageView from '@/modules/member/views/MyPageView'
import MyPageUpdateView from '@/modules/member/views/MyPageUpdateView'
import HaruSelectView from '@/modules/chatwithharubot/views/HaruSelectView'
import ChatWithOtherView from '@/modules/chatwithother/views/ChatWithOtherView'
import ChatWithHaruView from '@/modules/chatwithharubot/views/ChatWithHaruView'
import ChatRoomOtherView from '@/modules/chatwithother/views/ChatRoomOtherView'
// import ChatRoomHaruView from '@/modules/chatwithharubot/views/ChatRoomHaruView'
import ChatRoomPersonaView from '@/modules/chatwithharubot/views/ChatRoomPersonaView'
import ChatRoomHaruAskView from '@/modules/chatwithharubot/views/ChatRoomHaruAskView'


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
        component: ChatWithOtherView,
        props: true
      },
      {
        path: '/chatroomother',
        name: 'chatRoomOtherView',
        component: ChatRoomOtherView,
        props: true
      },
      {
        path: '/mypage',
        name: 'myPageView',
        component: MyPageView
      },
      {
        path: '/mypageupdate',
        name: 'myPageUpdateView',
        component: MyPageUpdateView
      },
      {
        path:'/haruselect',
        name:'haruSelectView',
        component:HaruSelectView
      },
      {
        path: '/chatwithharubot',
        name: 'ChatWithHaruView',
        component: ChatWithHaruView
      },
      {
        path: '/chatroomharu',
        name: 'ChatRoomHaruAskView',
        component: ChatRoomHaruAskView
      },
      {
        path: '/chatroompersona',
        name: 'ChatRoomPersonaView',
        component: ChatRoomPersonaView
      },
    ]
  },

  {
    path: '/admin',
    name: 'adminLayout',
    component: AdminLayout,
    children: [
      {
        path: '/admin',
        name: 'statisticsView',
        component: AdminStatisticsView
      },
      {
        path: '/admin/report',
        name: 'AdminReportView',
        component: AdminReportView
      },
      {
        path: '/admin/subject',
        name: 'AdminSubjectView',
        component: AdminSubjectView
      }
    ]
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router