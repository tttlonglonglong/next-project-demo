import React, { useState, useReducer, useEffect, useLayoutEffect, memo, useMemo, useCallback, useRef } from "react";

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


// 组件状态更新，MyCountFuc组件会重新渲染，这个函数组件会重新执行，方法被重新执行，config会重新声明，上次渲染和下一次渲染config是完全不同的俩个对象
// 每次方法调用都会形成自己的闭包，里面所有的变量都会重新声明一遍
// 意味use之类的hooks函数只会执行一次
function MyCountFuc() {
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name, setName] = useState('jocky')

  // 每次返回的都是同一个对象，而不是新的对象；这样就能在不同的渲染周期读到即时的最新的数据
  const countRef = useRef() // useRef每次返回的都是同一个对象 {current:''}
  countRef.current = count

  // useMemo：记忆对象
  const config = useMemo(() => ({
    text: `count is ${count}`,
    color: count > 3 ? 'red' : 'blue'
  }), [count])

  //  useMemo实现 useCallback
  const handleButtonClick = useMemo(() => () => dispatchCount({ type: 'add' }), [])

  // 闭包问题
  const handleAlertButtonClick = function () {
    // alert打印出来的还是2s之前的alert，事件触发的时候count是多少，alert就是多少；即使后面count更新了新的值，这里alert的也是旧值
    // 在class-comp中，调用的是this.state.count,输出的还是新值，闭包的是this，不是this.state.count
    // 在class-comp中，如果使用count = this.state.count，这样alert输出的就是旧值
    setTimeout(() => {
      // alert(count)
      // 使用countRef.current 获取新的数据
      // 这里闭包的countRef，因为countRef每次都一样，所以能拿到最新的值
      alert(countRef.current)
    }, 2000)
  }

  console.log('Parent render')
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child
        config={config}
        onButtonClick={handleButtonClick}
      />
      <button onClick={handleAlertButtonClick}>alert count</button>
    </div>
  )
}

// memo让func-com拥有类似 class-comp的shouldComponentUpdate的功能
const Child = memo(function Child({ onButtonClick, config }) {
  console.log('child render')
  return (
    <>
      <div>输入框值的变化不会引起组件值的重新渲染</div>
      <button onClick={onButtonClick} style={{ color: config.color }}>{config.text}</button>
    </>
  )
})


export default MyCountFuc

