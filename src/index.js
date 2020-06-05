import HelloWorld from './components/HelloWorld'
import Button from './components/Button'

const install = Vue => {
  HelloWorld.install(Vue)
  Button.install(Vue)
}

export default {
  install
}
