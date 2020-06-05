import Button from './Button'

const install = (Vue) => {
  Vue.component('self-button', Button)
}

if(window && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
