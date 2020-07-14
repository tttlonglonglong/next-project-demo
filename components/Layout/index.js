import { useState, useCallback } from "react";
import Link from 'next/link'
import { withRouter } from "next/router";
import getConfig from "next/config";
import { connect } from "react-redux";
import axios from "axios";
import { UserOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";
import Container from "../Container";
import { logout } from "../../store/store";
const { Header, Content, Footer } = Layout


const { publicRuntimeConfig } = getConfig()

// 声明在外面，不会每次执行都声明一个新对象 
const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}
const footerStyle = {
  textAlign: 'center'
}

// const Comp = ({ children, color, style }) => {
//   return <div style={{ color, ...style }}>{children}</div>
// }

function myLayout({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query
  const [search, setSearch] = useState(urlQuery || '')
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [setSearch])

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`)
  }, [search])
  const handleLogout = useCallback((e) => {
    e.preventDefault()
    logout()
  }, [logout])
  const handleGotoOAuth = useCallback((e) => {
    e.preventDefault()
    axios.get(`/prepare-auth?url=${router.asPath}`)
      .then(resp => {
        if (resp.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL
        } else {
          console.log('prepare auth fail', resp)
        }
      }).catch(err => {
        console.log('prepare auth failed', err)
      })
    // logout()
  }, [logout])
  const userDropDowm = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>
          登 出
        </a>
      </Menu.Item>
    </Menu >
  )
  return (
    <Layout>
      <Header>
        <Container render={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined style={githubIconStyle} />
              </Link>
              {/* <Icon type="icon-example"  /> */}
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {/* {props.user && props.user.id}{111} */}
              {user && user.id ? (
                <Dropdown overlay={userDropDowm}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                  <Tooltip title="点击进行登陆">
                    <a
                      // href={publicRuntimeConfig.OAUTH_URL}
                      href={`/prepare-auth?url=${router.asPath}`}
                    // onClick={handleGotoOAuth}
                    >
                      <Avatar size={40} icon={<UserOutlined />} />
                    </a>
                  </Tooltip >
                )}
            </div>
          </div>
        </Container>
      </Header>
      <Content >
        <Container
        // render={<Comp color="red" />}
        // render={<div style={{ color: 'red', fontSize: '40px' }} />}
        >
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by A.T @<a href="mailto:1530085455@qq.com">azT@</a>
      </Footer>
      <style jsx>{`
        .header-inner{
          display: flex;
          justify-content:space-between
        }
        .header-left{
          display: flex;
          justify-content:flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next{
          height:100%;
        }
        .ant-layout{
          min-height:100%;
        }
        .ant-layout-header{
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content{
          background: #fff;
        }
        `}</style>
    </Layout >
  )
}


export default connect(
  function mapState(state) { return { user: state.user } },
  function mapReducer(dipatch) {
    return {
      logout: () => { dipatch(logout()) }
    }
  }
)(withRouter(myLayout))