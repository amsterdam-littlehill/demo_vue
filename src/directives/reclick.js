/**
 * 函数防抖
 * @param {function} fn 方法名
 * @param {number} delay 延迟
 */
function debounce (fn, delay = 500) {
  let timer = null
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 事件绑定
 *
 * @param {any} element  绑定dom
 * @param {any} event    事件类型
 * @param {any} listener 方法
 */
function addEvent (element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener, true)
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, listener)
  } else {
    element['on' + event] = listener
  }
}
const reClick = {
  bind (el, binding) {
    console.log('directive：throttleClick bind')
    addEvent(el, 'click', debounce(binding.value))
  },
  inserted () {
    // 聚焦元素
    console.log('el inserted')
  },
  unbind (el, binding) {
    el.removeEventListener('click', binding.value)
  }
}
const install = function (Vue) {
  Vue.directive('reClick', reClick)
}

if (window.Vue) {
  window.reclick = reClick
  Vue.use(install); // eslint-disable-line
}

reClick.install = install
export default reClick
