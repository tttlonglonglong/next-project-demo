import { useCallback, memo, isValidElement, useEffect } from "react";
import { withRouter } from "next/router";
import { Row, Col, List, Pagination } from "antd";
import Link from "next/link";
import Router from "next/router";
import Repo from "../components/Repo";
import { cacheArray } from "../lib/repo-basic-cache";

const api = require('../lib/api')

const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']
const SORT_TYPES = [
  {
    name: 'Best Match'
  },
  {
    name: 'Most Starts',
    value: 'stars',
    order: 'desc'
  },
  {
    name: 'Fewest Starts',
    value: 'stars',
    order: 'asc'
  },
  {
    name: 'Most Forks',
    value: 'forks',
    order: 'desc'
  },
  {
    name: 'Fewest Forks',
    value: 'forks',
    order: 'asc'
  },
]

/**
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的项目开发主语言
 * page: 分页页面
 * 
 */
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

const selectedItemStyle = {
  borderLeft: '2px solid #e36209',
  fontWeight: 100,
  marginLeft: '-2px',
}

function noop() { }

const per_page = 20

const isServer = typeof window === "undefined"
const FilterLink = memo(({ name, query, lang, sort, order, page }) => {
  // const doSearch = (config) => {
  //   Router.push({
  //     pathname: '/search',
  //     query: {
  //       query,
  //       lang,
  //       sort,
  //       order
  //     }
  //   })
  // }
  let queryString = `?query=${query}`
  if (lang) queryString += `&lang=${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page}`

  queryString += `&per_page=${per_page}`
  return <Link href={`/search${queryString}`}>
    {/* antd:组件传出来的就是一个a标签 */}
    {isValidElement(name) ? name : <a>{name}</a>}
  </Link>
})

function Search({ repos = { items: [] }, router }) {
  const { ...querys } = router.query
  const { lang, sort, order, page } = router.query

  useEffect(() => {
    if (!isServer) {
      // 只有用户相关的操作的搜索才去缓存，节省服务端的内存
      cacheArray(repos.items)
    }
  })

  return <div className="root">
    <Row gutter={20}>
      <Col span={6}>
        <List
          bordered
          header={<span className="list-header">语言</span>}
          style={{ marginBottom: 20 }}
          dataSource={LANGUAGES}
          renderItem={item => {
            const selected = lang === item
            return (
              <List.Item style={selected ? selectedItemStyle : null}>
                {selected ? <span>{item}</span> : <FilterLink {...querys} lang={item} name={item} />}
              </List.Item>
            )
          }}
        />
        <List
          bordered
          header={<span className="list-header">排序</span>}
          style={{ marginBottom: 20 }}
          dataSource={SORT_TYPES}
          renderItem={item => {
            let selected = false
            if (item.name === 'Best Match' && !sort) {
              selected = true
            } else if (item.value === sort && item.order === order) {
              selected = true
            }
            return (
              <List.Item style={selected ? selectedItemStyle : null}>
                {selected ? <span>{item.name}</span> : <FilterLink {...querys} sort={item.value} order={item.order} name={item.name} />}
              </List.Item>
            )
          }}
        />
      </Col>
      <Col span={18}>
        <h2 className="repos-title">{repos.total_count} 个仓库</h2>
        {
          repos.items.map(repo => <Repo repo={repo} key={repo.id} />)
        }
        <div className="pagination">
          <Pagination
            showSizeChanger={false}
            pageSize={per_page}
            current={Number(page) || 1}
            total={repos.total_count < 1000 ? repos.total_count : 999}
            onChange={noop}
            itemRender={(page, type, ol) => {
              const p = type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
              const name = type === 'page' ? page : ol
              return <FilterLink {...querys} page={p} name={name} />
            }}
          />
        </div>
      </Col>
    </Row >
    <style jsx>{`
      .root {
        padding: 20px 0;
      }
      .list-header{
        font-weight: 800;
        font-size: 16px;
      }
      .repos-title{
        border-bottom: 1px solid #eee;
        font-size: 24px;
        line-height:50px;
      }
      .pagination{
        padding: 20px;
        text-align: center;
      }
      `}</style>
  </div >
}

Search.getInitialProps = async ({ ctx }) => {

  const { query, sort, lang, order, page } = ctx.query
  if (!query) {
    return {
      repos: {
        items: [],
        total_count: 0
      }
    }
  }

  // ?q=react+language:javascript&sort=starts&order=desc&page=2
  let queryString = `?q=${query}`
  if (lang) queryString += `+language:${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page}`
  const result = await api.request({
    url: `/search/repositories${queryString}`
  }, ctx.req, ctx.res).catch(err => console.log('Search.getInitialProps--err'))
  return {
    repos: result.data
    // repos: data
  }

}
export default withRouter(Search)