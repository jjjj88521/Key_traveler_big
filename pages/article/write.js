import dynamic from 'next/dynamic'
import { useState } from 'react'

const QuillEditor = dynamic(() => import('@/components/reactQuill'), {
  ssr: false,
})

const Home = () => {
  const [editorHtml, setEditorHtml] = useState('')

  return (
    <>
      <div>
        <QuillEditor value={editorHtml} onChange={setEditorHtml} />
        <button className="btn btn-primary" onClick={''} type="submit">
          送出
        </button>
      </div>
      <hr />
      <h3 className="mt-5">目前的 HTML code</h3>
      <div className="">{JSON.stringify(editorHtml)}</div>
      <br />
      {/* <Link href="/">Back</Link> */}
    </>
  )
}

export default Home
