import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5dd3f89f = () => interopDefault(import('..\\pages\\FormComponent.vue' /* webpackChunkName: "pages/FormComponent" */))
const _7fa256fa = () => interopDefault(import('..\\pages\\FormPivotTable.vue' /* webpackChunkName: "pages/FormPivotTable" */))
const _25f78377 = () => interopDefault(import('..\\pages\\FormPlan.vue' /* webpackChunkName: "pages/FormPlan" */))
const _538b14d5 = () => interopDefault(import('..\\pages\\FormPlanCareer.vue' /* webpackChunkName: "pages/FormPlanCareer" */))
const _e48248de = () => interopDefault(import('..\\pages\\FormQualification.vue' /* webpackChunkName: "pages/FormQualification" */))
const _9abc5508 = () => interopDefault(import('..\\pages\\FormSelfAssessment.vue' /* webpackChunkName: "pages/FormSelfAssessment" */))
const _0424be78 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/FormComponent",
    component: _5dd3f89f,
    name: "FormComponent"
  }, {
    path: "/FormPivotTable",
    component: _7fa256fa,
    name: "FormPivotTable"
  }, {
    path: "/FormPlan",
    component: _25f78377,
    name: "FormPlan"
  }, {
    path: "/FormPlanCareer",
    component: _538b14d5,
    name: "FormPlanCareer"
  }, {
    path: "/FormQualification",
    component: _e48248de,
    name: "FormQualification"
  }, {
    path: "/FormSelfAssessment",
    component: _9abc5508,
    name: "FormSelfAssessment"
  }, {
    path: "/",
    component: _0424be78,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
