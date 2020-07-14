import { createContext, useState, useContext } from "react";
// useContext上值如果是对象，也必须是值引用地址改变才更新
const MyContext = createContext()

const Parent = (props) => {
  const [value, setValue] = useState({ text: 'test' })
  return (
    <div>
      <MyContext.Provider value={value}>
        {props.children}
        <button onClick={() => { setValue(v => { console.log('v1', v); v.text = v.text + '1'; console.log('v2', v); return { ...v } }) }}>updateContext</button>
      </MyContext.Provider>
    </div >
  )
}

const Child = (props) => {
  const context = useContext(MyContext)
  console.log('context', context, 'props---->', props)
  return (
    <div>
      <div>context.value:{context.text}</div>
    </div>
  )
}


export default () => {
  return (
    <Parent>
      <Child />
    </Parent>
  )
}