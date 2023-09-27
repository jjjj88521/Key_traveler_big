import Link from 'next/link'
import CKeditor from '@/components/CKeditor'
import { useState, useEffect } from 'react'

const Editor = () => {
  const [editorLoaded, setEditorLoaded] = useState()
  const [data, setData] = useState('')

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  return (
    <>
      <div className="left">123</div>
      <div className="right">
        {
          <CKeditor
            name="description"
            onChange={(data) => {
              setData(data)
            }}
            editorLoaded={editorLoaded}
          />
        }
      </div>

      <h3>目前的 HTML code</h3>
      <div>{JSON.stringify(data)}</div>
      <br />
      <Link href="/">Back</Link>
    </>
  )
}

export default Editor
