const img123 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzIiIGhlaWdodD0iOTIiPjxwYXRoIGZpbGw9IiNFQTQzMzUiIGQ9Ik0xMTUuNzUgNDcuMThjMCAxMi43Ny05Ljk5IDIyLjE4LTIyLjI1IDIyLjE4cy0yMi4yNS05LjQxLTIyLjI1LTIyLjE4QzcxLjI1IDM0LjMyIDgxLjI0IDI1IDkzLjUgMjVzMjIuMjUgOS4zMiAyMi4yNSAyMi4xOHptLTkuNzQgMGMwLTcuOTgtNS43OS0xMy40NC0xMi41MS0xMy40NFM4MC45OSAzOS4yIDgwLjk5IDQ3LjE4YzAgNy45IDUuNzkgMTMuNDQgMTIuNTEgMTMuNDRzMTIuNTEtNS41NSAxMi41MS0xMy40NHoiLz48cGF0aCBmaWxsPSIjRkJCQzA1IiBkPSJNMTYzLjc1IDQ3LjE4YzAgMTIuNzctOS45OSAyMi4xOC0yMi4yNSAyMi4xOHMtMjIuMjUtOS40MS0yMi4yNS0yMi4xOGMwLTEyLjg1IDkuOTktMjIuMTggMjIuMjUtMjIuMThzMjIuMjUgOS4zMiAyMi4yNSAyMi4xOHptLTkuNzQgMGMwLTcuOTgtNS43OS0xMy40NC0xMi41MS0xMy40NHMtMTIuNTEgNS40Ni0xMi41MSAxMy40NGMwIDcuOSA1Ljc5IDEzLjQ0IDEyLjUxIDEzLjQ0czEyLjUxLTUuNTUgMTIuNTEtMTMuNDR6Ii8+PHBhdGggZmlsbD0iIzQyODVGNCIgZD0iTTIwOS43NSAyNi4zNHYzOS44MmMwIDE2LjM4LTkuNjYgMjMuMDctMjEuMDggMjMuMDctMTAuNzUgMC0xNy4yMi03LjE5LTE5LjY2LTEzLjA3bDguNDgtMy41M2MxLjUxIDMuNjEgNS4yMSA3Ljg3IDExLjE3IDcuODcgNy4zMSAwIDExLjg0LTQuNTEgMTEuODQtMTN2LTMuMTloLS4zNGMtMi4xOCAyLjY5LTYuMzggNS4wNC0xMS42OCA1LjA0LTExLjA5IDAtMjEuMjUtOS42Ni0yMS4yNS0yMi4wOSAwLTEyLjUyIDEwLjE2LTIyLjI2IDIxLjI1LTIyLjI2IDUuMjkgMCA5LjQ5IDIuMzUgMTEuNjggNC45NmguMzR2LTMuNjFoOS4yNXptLTguNTYgMjAuOTJjMC03LjgxLTUuMjEtMTMuNTItMTEuODQtMTMuNTItNi43MiAwLTEyLjM1IDUuNzEtMTIuMzUgMTMuNTIgMCA3LjczIDUuNjMgMTMuMzYgMTIuMzUgMTMuMzYgNi42MyAwIDExLjg0LTUuNjMgMTEuODQtMTMuMzZ6Ii8+PHBhdGggZmlsbD0iIzM0QTg1MyIgZD0iTTIyNSAzdjY1aC05LjVWM2g5LjV6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTI2Mi4wMiA1NC40OGw3LjU2IDUuMDRjLTIuNDQgMy42MS04LjMyIDkuODMtMTguNDggOS44My0xMi42IDAtMjIuMDEtOS43NC0yMi4wMS0yMi4xOCAwLTEzLjE5IDkuNDktMjIuMTggMjAuOTItMjIuMTggMTEuNTEgMCAxNy4xNCA5LjE2IDE4Ljk4IDE0LjExbDEuMDEgMi41Mi0yOS42NSAxMi4yOGMyLjI3IDQuNDUgNS44IDYuNzIgMTAuNzUgNi43MiA0Ljk2IDAgOC40LTIuNDQgMTAuOTItNi4xNHptLTIzLjI3LTcuOThsMTkuODItOC4yM2MtMS4wOS0yLjc3LTQuMzctNC43LTguMjMtNC43LTQuOTUgMC0xMS44NCA0LjM3LTExLjU5IDEyLjkzeiIvPjxwYXRoIGZpbGw9IiM0Mjg1RjQiIGQ9Ik0zNS4yOSA0MS40MVYzMkg2N2MuMzEgMS42NC40NyAzLjU4LjQ3IDUuNjggMCA3LjA2LTEuOTMgMTUuNzktOC4xNSAyMi4wMS02LjA1IDYuMy0xMy43OCA5LjY2LTI0LjAyIDkuNjZDMTYuMzIgNjkuMzUuMzYgNTMuODkuMzYgMzQuOTEuMzYgMTUuOTMgMTYuMzIuNDcgMzUuMy40N2MxMC41IDAgMTcuOTggNC4xMiAyMy42IDkuNDlsLTYuNjQgNi42NGMtNC4wMy0zLjc4LTkuNDktNi43Mi0xNi45Ny02LjcyLTEzLjg2IDAtMjQuNyAxMS4xNy0yNC43IDI1LjAzIDAgMTMuODYgMTAuODQgMjUuMDMgMjQuNyAyNS4wMyA4Ljk5IDAgMTQuMTEtMy42MSAxNy4zOS02Ljg5IDIuNjYtMi42NiA0LjQxLTYuNDYgNS4xLTExLjY1bC0yMi40OS4wMXoiLz48L3N2Zz4="
import { useEffect } from "react";
import axios from "axios";
import { Button, Icon, Tabs } from "antd";
import { MailOutlined, StarFilled } from '@ant-design/icons';
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import LRU from "lru-cache";

import Repo from "../components/Repo";
import { cacheArray, REPO_CACHE } from "../lib/repo-basic-cache";
import getConfig from "next/config";

// 每使用一次，更新一次使用时间
const cache = new LRU({
  maxAge: 1000 * 60 * 10, // 最长未使用数据的时间：缓存10分钟
})
const api = require('../lib/api')
const { publicRuntimeConfig } = getConfig()
let cachedUserRepos, cachedUserStaredRepos
const isServer = typeof window === "undefined"

const data = {
  items: [{
    "id": 10270250,
    "node_id": "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
    "name": "react",
    "full_name": "facebook/react",
    "private": false,
    "owner": {
      "login": "facebook",
      "id": 69631,
      "type": "Organization",
      "site_admin": false
    },
    html_url: 'https://github.com/reactiveui/ReactiveUI',
    description: 'An advanced, composable, functional reactive model-view-viewmodel framework for all .NET platforms that is inspired by functional reactive programming. ReactiveUI allows you to  abstract mutable state away from your user interfaces, express the idea around a feature in one readable place and improve the testability of your application.',
    fork: false,
    url: 'https://api.github.com/repos/reactiveui/ReactiveUI',
    created_at: '2010-06-11T05:24:29Z',
    updated_at: '2020-07-10T16:40:28Z',
    pushed_at: '2020-07-10T12:12:54Z',
    git_url: 'git://github.com/reactiveui/ReactiveUI.git',
    ssh_url: 'git@github.com:reactiveui/ReactiveUI.git',
    clone_url: 'https://github.com/reactiveui/ReactiveUI.git',
    svn_url: 'https://github.com/reactiveui/ReactiveUI',
    homepage: 'https://www.reactiveui.net',
    size: 86430,
    stargazers_count: 5579,
    watchers_count: 5579,
    language: 'C#',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: false,
    has_pages: false,
    forks_count: 977,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 93,
    license: [Object],
    forks: 977,
    open_issues: 93,
    watchers: 5579,
    default_branch: 'main',
    score: 1
  }],
  total_count: 32131
}
cachedUserRepos = data.items
cachedUserStaredRepos = data.items
function Index({ userRepos = cachedUserRepos, userStaredRepos = cachedUserStaredRepos, user, withRouter = {}, router }) {
  const tabKey = router.query.key || '1'
  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`)
  }
  useEffect(() => {
    if (!isServer) {
      cachedUserRepos = userRepos
      cachedUserStaredRepos = userStaredRepos
      const timeout = setTimeout(() => {
        cachedUserRepos = null
        cachedUserStaredRepos = null
      }, 1000 * 10);
      // 值是null的时候不缓存
      // if (userRepos) {
      //   cache.set('userRepos', userRepos)
      // }
      // if (!userStartedRepos) {
      //   cache.set('userStartedRepos', userStartedRepos)
      // }



    }
  }, [userRepos, userStaredRepos])

  useEffect(() => {
    window.REPO_CACHE = REPO_CACHE
    // 服务端不实用cache，不会占用内存
    if (!isServer) {
      cacheArray(userRepos)
      cacheArray(userStaredRepos)
    }
  })
  if (!user || !user.id) {
    return <div className="root">
      <p>亲，您还没有登录哦～</p>
      <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>点击登陆</Button>
      <style jsx>{`
        .root{
          height: 400px;
          display:flex;
          flex-direction: column;
          justify-content:center;
          align-items: center;
        }
        `}</style>
    </div>
  }

  user = {
    login: "login",
    "name": "name",
    bio: "bio",
    email: "email"
  }
  return <div className="root">
    <div className="user-info">
      <img src={user.avatar_url || img123} alt="user avatar" className="" />
      <span className="login">{user.login}</span>
      <span className="name">{user.name}</span>
      <span className="bio">{user.bio}</span>
      <p className="email">
        <MailOutlined />
        {/* <Icon type="mail" style={{ marginRight: 10 }} /> */}
        <a href={`mailto: ${user.email}`} >{user.email}</a>
      </p>
    </div>
    <div className="user-repos">
      <Tabs defaultActiveKey={tabKey} onChange={handleTabChange} animated={false}>
        <Tabs.TabPane tab="你的仓库" key="1">

          {
            userRepos.map(repo => <Repo key={repo.id} repo={repo} />)
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab="你关注的仓库" key={"2"}>
          {
            userStaredRepos.map(repo => <Repo key={repo.id} repo={repo} />)
          }
        </Tabs.TabPane>
      </Tabs>
    </div>
    <style jsx>{`
      .root{
        display: flex;
       
        padding: 20px 0;
      }
      .user-info{
        width: 200px;
        margin-right: 40px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
      }
      .login{
        font-weight: 800;
        font-size: 20px;
        margin-top: 20px;
      }
      .name{
        font-size: 16px;
        colot: #777;
      }
      .bio{
        margin-top: 20px;
        color: #333;
      }
      .avatar{
        width: 100%;
        border-radius: 5px;
      } 
      .user-repos{
        flex-grow:1;
      }
    `}</style>
  </div>
}



// 内部没有 await的时候，不能用async 会报错
// Index.getInitialProps = () => {}
Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // // 浏览器: 请求会加域名 http://localhost:3000/, 
  // // 服务端执行：没有域名的场景 http://localhost, 不会加端口，相当于直接请求了80端口
  // const result = await axios.get(`/github/search/repositories?q=react`)
  // const result = await api.request({
  //   url: '/github/search/repositories?q=react'
  // }, ctx.req, ctx.res)

  // const user = reduxStore.getState().user
  if (!isServer) {
    if (cachedUserRepos && cachedUserStaredRepos) {
      console.log('使用缓存的数据')
      return {
        userRepos: cachedUserRepos,
        userStartRepos: cachedUserStaredRepos
      }
    }
    // if (cache.get('userRepos') && cache.get('cachedUserStaredRepos')) {
    //   return {
    //     userRepos: cache.get('userRepos'),
    //     userStartRepos: cache.get('cachedUserStaredRepos')
    //   }
    // }
  }

  // // 获取用户的仓库
  const userRepos = await api.request({
    url: `/user/repos`
  }, ctx.req, ctx.res).catch(err => console.log('Index.userRepos-warn'))
  // 获取用户关注的项目
  const userStaredRepos = await api.request({
    url: '/user/starred',
  }, ctx.req, ctx.res).catch(err => console.log('Index.userStaredRepos-warn'))

  // 非服务端渲染才缓存数据，服务端cachedUserRepos 的变量，会作为服务器上运行的变量，返回给每一个用户
  // 服务端的每个模块的中的数据都是一样的

  return {
    userRepos: (userRepos && userRepos.data) || [],
    userStaredRepos: (userStaredRepos && userStaredRepos.data) || []
  }
}


export default withRouter(connect(
  function mapStateToProps(state) {
    return {
      user: state.user
    }
  },
  function mapDispatchToProps(dispatch) { return {} }

)(Index))