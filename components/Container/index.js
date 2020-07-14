import { cloneElement } from "react";

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
}

export default ({ children, render = <div /> }) => {
  console.log('ContaineRender-->', render.props.style)
  // 拷贝render节点，增加一些节点
  const newElement = cloneElement(render, {
    style: Object.assign({}, render.props.style, style),
    children
  })
  return newElement
  // return (<Comp>{children}</Comp >)
}