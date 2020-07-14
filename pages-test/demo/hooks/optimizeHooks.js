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
  // 这样只会执行一次，count变化的时候也不会重新渲染
  const counterRef = useRef({
    text: `count is ${count}`,
    color: count > 3 ? 'red' : 'blue'
  })
  // 赋值语句，每次都会是新的对象
  // counterRef.current = {
  //   text: `count is ${count}`,
  //   color: count > 3 ? 'red' : 'blue'
  // } 
  // 只有输入框优化的时候，子组件不在更新执行render方法
  // useMemo：记忆对象
  const config = useMemo(() => ({
    text: `count is ${count}`,
    color: count > 3 ? 'red' : 'blue'
  }), [count])

  // 这个方法不依赖于任何外部变量
  // useCallback：记忆函数
  // const handleButtonClick = useCallback(() => dispatchCount({ type: 'add' }), [])
  // 使用useMemo实现useCallback的功能
  const handleButtonClick = useMemo(() => () => dispatchCount({ type: 'add' }), [])
  console.log('Parent render')
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child
        // config={counterRef.current}
        config={config}
        // 匿名方法每次都会重新生成，这样导致传递给子组件的props每次都是新的
        // onButtonClick={() => dispatchCount({ type: 'add' })}
        onButtonClick={handleButtonClick}
      />
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

