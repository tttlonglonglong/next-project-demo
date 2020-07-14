import { useState, useCallback, useEffect } from "react";
import { Avatar, Button, Select, Spin } from "antd";
import dynamic from "next/dynamic";

import { getLastUpdated } from "../../lib/util";
import widthRepoBasic from "../../components/widthRepoBasic";
import SearchUser from "../../components/SearchUser";

const MdRender = dynamic(() => import('../../components/MarkdownRender'))

import api from "../../lib/api";
const CACHE = {}


function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MdRender content={issue.body} />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">打开Issue讨论页面</Button>
      </div>
      <style jsx>{`
        .root{
          background: #fafafa;   
          padding: 20px;
        }
        .actions{
          text-align: right;
        }
        `}
      </style>
    </div>
  )
}

function IssueItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false)

  const toggleShowDetail = useCallback(() => {
    setShowDetail(showDetail => !showDetail)
  }, [])

  return (
    <div>
      <div className="issue">
        <Button onClick={toggleShowDetail} type="primary" size="small" style={{ position: 'absolute', right: 10, top: 10 }}>{showDetail ? '隐藏' : '查看'}</Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
            {
              issue.labels.map(label => <Label label={label} key={label.id} />)
            }
          </h6>
          <p className="sub-info">
            <span>Update at {issue.updated_at && getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>
      </div>
      {showDetail ? <IssueDetail issue={issue} /> : null}

      <style jsx>{`
        .issue{
          display: flex;
          position: relative;
          padding: 10px;
        }
        .issue:hover{
          background: #fafafa;
        }
        .issue + .issue{
          border-top: 1px solid #eee;
        }
        .main-info > h6{
          max-width: 600px;
          padding-right: 40px;
          font-size: 16px;
        }
        .avatar{
          margin-right: 20px;
        }
        .sub-info{
          margin-bottom: 0;
        }
        .sub-info > span + span {
          display: inline-block;
          margin-left: 20px;
          font-size: 12px;
        }
        `}</style>
    </div >
  )
}

function makeQuery(creator, state, labels) {
  let creatorStr = creator ? `creator=${creator}` : ''
  let stateStr = state ? `state=${state}` : ''
  let labelStr = ''
  if (labels && labels.length > 0) {
    labelStr = `labels=${labels.join(',')}`
  }

  const arr = []
  if (creatorStr) arr.push(creatorStr)
  if (stateStr) arr.push(stateStr)
  if (labelStr) arr.push(labelStr)

  return `?${arr.join('&')}`
}

function Label({ label }) {
  return (
    <>
      <span className="label" style={{ backgroundColor: `#${label.color}` }}>{label.name}</span>
      <style jsx>{`
      .label {
        display: inline-block;
        line-height: 20px;
        margin-left: 15px;
        padding: 3px 10px;
        border-radius: 3px;
        font-size: 14px;
      }
        `}</style>
    </>
  )
}

const isServer = typeof window === 'undefined';
const Option = Select.Option
function Issues({ initialIssues, labels, owner, name }) {
  console.log('issues-->', issues, 'labels', labels)
  const [creator, setCreator] = useState()
  const [state, setState] = useState()
  const [label, setLabel] = useState([])
  const [issues, setIssues] = useState(initialIssues)
  const [fetching, setFetching] = useState()

  useEffect(() => {
    if (!isServer) {
      CACHE[`${owner}/${name}`] = labels
    }
  }, [owner, name, labels])

  const handleCreatorChange = useCallback((value) => {
    setCreator(value)
  }, [])
  const handleStateChange = useCallback((value) => {
    setState(value)
  }, [])
  const handleLabelChange = useCallback((value) => {
    setLabel(value)
  }, [])

  const handleSearch = useCallback(async () => {
    // search
    setFetching(true)
    await api.request({
      url: `/repos/${owner}/${name}/issues${makeQuery(creator, state, label)}`
    }).then(resp => {
      setIssues(resp.data).catch((err) => console.log("handleSearch err"))
    }).catch(err => { console.log('handleSearch err') })
    setFetching(false)
  }, [owner, name, creator, state, label])
  return (
    <div className="root">
      <div className="search">
        <SearchUser onChange={handleCreatorChange} value={creator} />
        <Select
          style={{ width: 200, marginLeft: 20 }}
          placeholder="状态"
          onChange={handleStateChange}
          value={state}
        >
          <Option value="all">all</Option>
          <Option value="open">open</Option>
          <Option value="closed">closed</Option>
        </Select>
        <Select
          mode="multiple"
          style={{ flexGrow: 1, marginLeft: 20, marginRight: 20, }}
          placeholder="Label"
          onChange={handleLabelChange}
          value={label}
        >
          {
            labels.map(la => <Option value={la.name} key={la.id}>{la.name}</Option>)
          }
        </Select>
        <Button type="primary" disabled={fetching} onClick={handleSearch}>搜索</Button>
      </div>
      {
        fetching ? <div className="loading"><Spin /></div> : <div className="issues">
          {issues.map(issue => <IssueItem issue={issue} key={issue.id} />)}
        </div>
      }
      <style jsx>{`
      .issues{
        border: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .search{
        display: flex;
      }
      .loading{
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
        `}</style>
    </div>
  )
}

const labelsData = [{
  color: 'c7def8',
  default: false,
  id: 6910,
  name: 'Browser: IE',
  url: 'www.baidu.com'
}]

const data = [{
  id: 1212121,
  title: 'react/facebook',
  updated_at: '2020-02-12',
  body: "312312312",
  labels: labelsData,
  user: {
    avatar_url: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2714978353,1075402837&fm=111&gp=0.jpg'
  }
}, {
  id: 1212423423121,
  title: 'react/facebook',
  updated_at: '2020-02-12',
  body: "312312312",
  labels: labelsData,
  user: {
    avatar_url: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2714978353,1075402837&fm=111&gp=0.jpg'
  }
}]
Issues.getInitialProps = async ({ ctx }) => {
  console.log('Issues.getInitialProps', ctx.query)
  const { owner, name, labels } = ctx.query
  const full_name = `${owner}/${name}`
  const fetchs = await Promise.all([
    await api.request({
      url: `/ repos / ${owner} / ${name} / issues`
    }, ctx.req, ctx.res),
    CACHE[full_name] ? Promise.resolve(data: CACHE[full_name]) :
      await api.request({
        url: `/ repos / ${owner} / ${name} / labels`
      }, ctx.req, ctx.res)
  ]).catch(err => console.log('fetchs errs'))

  return {
    owner,
    name,
    nameissues: fetchs[0].data,
    // initialIssues: data,
    labels: fetchs[1].data
    // labels: labelsData
  }
}

export default widthRepoBasic(Issues, 'issues')