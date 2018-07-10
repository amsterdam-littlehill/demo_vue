import reClick from './reClick'

const install = function (Vue) {
  Vue.directive('reClick', reClick)
}

if (window.Vue) {
  window.reclick = reClick
  Vue.use(install); // eslint-disable-line
}

reClick.install = install
export default reClick
