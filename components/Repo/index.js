import Link from "next/link";
import { Icon } from "antd";
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { getLastUpdated } from "../../lib/util";


function getLicense(license) {
  return license ? `${license.spdx_id} license` : ''
}

export default ({ repo = {} }) => {
  return (
    <div className="root">
      <div className="basic-content">
        <div className="basic-info">
          <h3 className="repo-title">
            <Link href={`/detail?owner=${repo.owner && repo.owner.login}&name=${repo.name}`}><a>{repo.full_name}</a></Link>
          </h3>
        </div>
        <div className="lang-star">
          <span className="lang">{repo.language}</span>
          <span className="stars">{repo.stargazers_count} <StarFilled /></span>
        </div>
      </div>
      <p className="repo-desc">{repo.description}</p>
      <p className="other-info">
        {
          repo.license ? (
            <span className="license">{getLicense(repo.license)}</span>
          ) : null
        }
        <span className="last-updated">{getLastUpdated(repo.updated_at)}</span>
        <span className="open-issues">{repo.open_issues_count} open issues</span>
      </p>
      <style jsx>{`
        .basic-content{
          display: flex;
          justify-content: space-between;
        }
        .other-info > span + span{
          margin-left: 10px;
        }
        /**如果这个节点是在一个列表中显示的，除了第一个节点之外，所有的节点 */
        .root + .root{
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .repo-title{
          font-size: 20px;
        }
        .lang-star{
          display: flex;
        }
        .lang-star > span{
          width: 120px;
          text-align: right;
        }
        .repo-desc {
          width: 400px;
          word-break:break-all;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      `}</style>
    </div >
  )
}