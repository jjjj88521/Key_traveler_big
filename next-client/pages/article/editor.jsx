import Link from 'next/link'
import CKeditor from '@/components/CKeditor'
import { useState, useEffect } from 'react'

const Editor = () => {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [data, setData] = useState('')

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  return (
    <>
      <CKeditor
        name="description"
        onChange={(data) => {
          setData(data)
        }}
        editorLoaded={editorLoaded}
      />
      <h3>目前的 HTML code</h3>
      <div>{JSON.stringify(data)}</div>
      <br />
      <Link href="/">Back</Link>
    </>
  )
}

export default Editor
