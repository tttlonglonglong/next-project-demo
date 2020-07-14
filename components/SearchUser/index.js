import { useState, useRef, useCallback } from "react";
import { Select, Spin } from 'antd'
import api from "../../lib/api";
const Option = Select.Option

function SeaerchUser({ onChange, value }) {

  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const timeoutRef = useRef()
  // { current: 0 }
  const lastFetchIdRef = useRef(0)

  const fetchUser = useCallback(value => {

    lastFetchIdRef.current += 1
    const fetchId = lastFetchIdRef.current
    setFetching(true)
    setOptions([])

    console.log("1", timeoutRef.current)
    console.log(timeoutRef.current)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    console.log("2", timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      // 肯定是客户端才进行的操作，不需要req和res
      api.request({
        url: `/search/users?q={value}`
      }).then(resp => {
        console.log('user:', resp)
        if (fetchId !== lastFetchIdRef) return
        const data = resp.data.items.map(user => (
          {
            text: user.login,
            value: user.login
          }
        ))

        setFetching(false)
        setOptions(data)
        console.log("3", timeoutRef.current)
        timeoutRef.current = null
      })
    }, 500)
  }, [])

  const handleChange = (value) => {
    setOptions([])
    setFetching(false)
    onChange(value)
  }

  return <Select
    style={{ width: 200 }}
    showSearch={true}
    notFoundContent={fetching ? < Spin size="small" /> : <span>nothing</span>}
    filterOption={false}
    value={value}
    placeholder="创建者"
    onChange={handleChange}
    onSearch={fetchUser}
    allowClear={true}
  >
    {
      options.map(op => (<Option value={op.value} key={op.value}>{op.text}</Option>))
    }
  </Select >
}

export default SeaerchUser