import HelloWorld from './HelloWorld'

const install = (Vue) => {
  Vue.component('self-hello-world', HelloWorld)
}

if(window && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
