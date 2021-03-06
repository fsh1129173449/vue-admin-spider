import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 具体的请求拦截在permission.js
export const constantRoutes = [
  // change by my self
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        requireAuth: true,
        affix: true
      }
      // 如果meta添加了affix: true 则会使得页面左侧边栏收起来不展示
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },


  {
    path: '/excel',
    name: 'Excel',
    component: Layout,
    redirect: '/excel/list',
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'excel'
    },
    children: [{
      path: 'list',
      name: 'ArticleList',
      component: () => import('@/views/excel/list'),
      meta: {
        title: '文件列表',
        requireAuth: true
      }
    },
    {
      path: 'key',
      name: 'Changekey',
      component: () => import('@/views/excel/changekey'),
      meta: {
        title: '修改密码',
        requireAuth: true
      }
    }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'role',
      component: () => import('@/views/permission/role'),
      name: 'RolePermission',
      meta: {
        title: '用户权限',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/handlelog',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Handlelog',
      component: () => import('@/views/handle-log/index'),
      meta: {
        title: '日志操作',
        icon: 'tree-table',
        requireAuth: true
      }
    }]
  },

  {
    path: '/monitoring',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/monitoring/index'),
      name: 'Resource monitoring',
      meta: {
        title: '资源监测',
        icon: 'example'
      }
    }]


  },

  {
    path: '/sendbug',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/sendbug/index'),
      name: 'Documentation',
      meta: {
        title: '提交错误',
        icon: 'bug'
      }
    }]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://github.com/JackMin1314/vue-admin-spider',
      meta: {
        title: '友情链接',
        icon: 'link'
      }
    }]
  },


  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
