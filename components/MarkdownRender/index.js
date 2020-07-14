import { memo, useMemo } from "react";
import MarkdownIt from "markdown-it";
import 'github-markdown-css'

const md = new MarkdownIt({
  html: true,
  linkify: true,
})

function b64_to_utf8(str) {
  // 将中文也转成字符串
  return str && decodeURIComponent(escape(atob(str)))
}

export default memo(function MarkdownRender({ content, isBase64 }) {
  const markdown = isBase64 ? b64_to_utf8(content) : content
  const html = useMemo(() => { return md.render(markdown) }, [markdown])
  console.log('MarkdownRender---->', markdown)
  return <div className="markdown-body">
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  </div>
})