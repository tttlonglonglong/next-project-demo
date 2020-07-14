import React, { useState, useReducer, useEffect, useLayoutEffect, useRef } from "react";

class MyCount extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.setState({ count: this.state.count + 1 })
    // }, 2000)
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
  render() {
    return <span onClick={() => { this.setState({ count: this.state.count + 1 }) }}>{this.state.count}</span>
  }
}


// 和redux非常像,根据action的类型对state进行更新
function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return false
  }
}

function MyCountFuc() {
  const [count, setCount] = useState(0)
  const [countState, dispatchCountState] = useReducer(countReducer, 0)
  const [name, setName] = useState('jocky')
  const inputRef = useRef()
  // test-objState
  const [obj, setObj] = useState({
    a: 0
  })
  // useEffect(() => {
  //   setObj(obj => { obj.a++; return obj })
  // }, [obj])
  // useEffect(() => {
  //   // console.log('func-hooks', this)
  //   const interval = setInterval(() => {
  //     console.log('func-hooks-interval', this)
  //     setCount(count => count + 1)
  //     dispatchCountState({ type: 'add' })
  //   }, 2000)
  //   return () => { console.log('func-hooks-clearInterval-interval', this), clearInterval(interval) }
  // }, [])

  // dom内容更新到html之后
  useEffect(() => {
    console.log('effect invoked')
    console.log('inputRef', inputRef)
    return () => {
      console.log('effect deteched')
    }
  })

  // 少用，会阻塞页面的渲染，会在计算出节点树，没有更新到真正的dom页面html之前执行
  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect invoked')
  //   return () => {
  //     console.log('useLayoutEffect deteched')
  //   }
  // })
  console.log('obj---->', obj)
  return (
    <div>
      <div>obj:{obj.a}</div>
      <div> count:{count}</div>
      <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => dispatchCountState({ type: 'add' })}>countState:{countState}</button>
    </div>
  )
}

// export default MyCount
export default MyCountFuc

// export default () => {
//   return (
//     <div>
//       B
//     </div>
//   )
// }