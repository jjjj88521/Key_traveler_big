// components/QuillEditor.js

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css' // import the styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const QuillEditor = ({ value, onChange }) => {
  var toolbarOptions = [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ['link', 'image'],
  ]

  const modules = { toolbar: toolbarOptions }

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  )
}

export default QuillEditor
