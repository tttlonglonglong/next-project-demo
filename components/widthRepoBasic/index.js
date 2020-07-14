import { useEffect } from "react";
import Repo from "../Repo";
import Link from "next/link";
import { withRouter } from "next/router";

import api from "../../lib/api";
import { get, cache } from "../../lib/repo-basic-cache";

const cacheData = {
  "id": 10270250,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
  "name": "react",
  "full_name": "facebook/react",
  "private": false,
  "owner": {
    "login": "facebook",
    "id": 69631,
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
    "avatar_url": "https://avatars3.githubusercontent.com/u/69631?v=4",
  },
  "html_url": "https://github.com/facebook/react",
  "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  "license": {
    "key": "mit",
    "name": "MIT License",
    "spdx_id": "MIT",
    "url": "https://api.github.com/licenses/mit",
    "node_id": "MDc6TGljZW5zZTEz"
  },
  "open_issues": 586,
}


function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, []).join('&')
  return `?${query}`
}

const isServer = typeof window === 'undefined'
export default function (Comp, type = 'index') {

  function WidthDetail({ repoBasic, router, ...rest }) {
    const query = makeQuery(router.query)
    console.log('获取到的仓库详情', repoBasic, 'rest', rest)

    useEffect(() => {
      // 服务端不实用cache，不会占用内存
      if (!isServer && repoBasic) {
        cache(repoBasic)
      }
    })
    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          <div className={"tabs"}>
            {
              type === 'index' ? <span className="tab">Readme</span> : <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            }
            {
              type === 'issues' ? <span className="tab" >Issues</span> : <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            }
          </div>
        </div>
        <div>
          <Comp {...rest} />
        </div>
        <style jsx>{`
        .root{
          padding-top: 20px;
        }  
        .repo-basic{
          padding: 20px;
          border: 1px solid #eee;
          margin-bottom: 20px;
          border-radius: 5px;
        }
        .tab + .tab {
          margin-left: 20px;
        }
      `}</style>
      </div >
    )
  }

  WidthDetail.getInitialProps = async (context) => {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve({})
    //   }, 1000)
    // })

    const { router, ctx } = context
    const { owner, name } = ctx.query
    // 仓库名，按名字来缓存的
    const full_name = `${owner}/${name}`

    let pageData = {}
    if (Comp.getInitialProps) {
      console.log('Comp.getInitialProps(context)', context)
      pageData = await Comp.getInitialProps(context)
    }
    console.log('Detail.getInitialProps-repoBasic', pageData)

    if (get(full_name)) {
      return {
        repoBasic: get(full_name),
        ...pageData
      }
    }

    // const repoBasic = await api.request({
    //   url: `/repos/${owner}/${name}`
    // }, ctx.req, ctx.res)

    let repoBasic = {}
    repoBasic.data = repoBasic.data || cacheData

    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }

  return withRouter(WidthDetail)
}