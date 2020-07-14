// import '../test/test.css'
import { Button } from 'antd'
import Router from 'next/router'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError', // err.cancelled
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent)
})

// 根路由
export default () => {
  return <Button>Router Events</Button>
}

