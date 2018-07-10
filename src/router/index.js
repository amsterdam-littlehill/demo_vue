import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
/* import NProgress from 'nprogress' */

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [{
      path: 'index',
      component: () => import('@/components/HelloWorld'),
      name: 'index',
      meta: {title: '首页', icon: 'documentation', noCache: true}
    }]
  },
  {
    path: '/component-base',
    redirect: '/component-base/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'component-base',
      component: resolve => require(['@/components/views/base-component/component-base'], resolve),
      meta: {title: '组件练习', icon: 'documentation', noCache: true}
    }
    ]
  },
  {
    path: '/router-base',
    redirect: '/router-base/index',
    component: Layout,
    meta: {title: '路由练习', icon: 'documentation'},
    children: [
      {
        path: 'index',
        name: 'base-router',
        component: resolve => require(['@/components/views/base-router/router-base'], resolve),
        meta: {title: '路由练习', icon: 'documentation', noCache: false}
      },
      {
        path: 'user/:id',
        name: 'Domain',
        component: resolve => require(['@/components/views/base-router/Domain'], resolve),
        meta: {title: '路由练习-动态路由', noCache: false},
        //
        beforeEnter: (to, from, next) => {
          to.meta.title = to.params.id
          next()
        },
        hidden: true
      },
      {
        path: 'home',
        name: 'router-base-home',
        component: resolve => require(['@/components/views/base-router/Home'], resolve),
        meta: {title: '路由练习-home', noCache: true},
        hidden: true
      },
      {
        path: 'about',
        name: 'router-base-about',
        component: resolve => require(['@/components/views/base-router/About'], resolve),
        meta: {title: '路由练习-about', noCache: true},
        hidden: true
      }]
  },
  {
    path: '/store-base',
    redirect: '/store-base/index',
    component: Layout,
    meta: {title: '状态管理练习', icon: 'documentation', noCache: true},
    children: [{
      path: 'index',
      name: 'store-base-index',
      component: resolve => require(['@/components/views/base-store/store-base'], resolve),
      meta: {title: '状态管理练习', icon: 'documentation', noCache: false}
    }]
  }
]

export default new Router({
  mode: 'history', // require service support
  // 滚动行为
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
/* router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(transition => {
  NProgress.done()
}) */
