// import '../test/test.css'
import { useEffect } from "react";
import { Button } from 'antd'
import { connect } from "react-redux";
import axios from "axios";
import { add } from "../store/store";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig()


// 根路由
const Index = (props) => {
  // console.log("拿到的redux的数据", props)
  console.log('publicRuntimeConfig', publicRuntimeConfig)

  useEffect(() => {
    axios.get('/api/user/info').then(resp => console.log('resp', resp))
  }, [])
  return <div>
    <div>{props.couter}</div>
    <div>{props.username}</div>
    <Button>hello world</Button>
    <a href={publicRuntimeConfig.OAUTH_URL}>去登陆</a>
  </div >
}

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3))
}

// return {}
// 不需要import 'React
// React.createElement('span',{},"Index")

export default connect(
  function mapStateToProps(state) {
    return {
      couter: state.couter.count,
      username: state.user.username,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: (num) => { dispatch({ type: 'ADD', num }) },
      rename: (name) => dispatch({ type: 'UPDATE_USERNAME', name })
    }
  }
)(Index)