
import Link from 'next/link'
import { Button } from "antd";

export default ({ children }) => {
  return (
    <>
      <header>
        <Link href="/" as="/a/1"><Button> Link to Index</Button></Link>
        <Link href="/a?id=1" as="/a/1"><Button> Link to A</Button></Link>
        <Link href="/b"><Button> Link to B</Button></Link>
        <Link href="/test/b/2"><Button> Link to test-B</Button></Link>
        <Link href="/demo/hooks/useState"><Button> Link to hooks-useState</Button></Link>
        <Link href="/demo/hooks/useContext"><Button> Link to hooks-useContext</Button></Link>
        <Link href="/demo/hooks/optimizeHooks"><Button> Link to hooks-optimizeHooks</Button></Link>
        <Link href="/demo/hooks/closureTrap"><Button> Link to hooks-closureTrap</Button></Link>

        <p>Lazy Comp</p>
      </header >
      {children}
    </>
  )
}