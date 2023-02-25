'use client'
// import Image from 'next/image'
import { Roboto_Slab, Source_Code_Pro } from 'next/font/google'
import styles from './page.module.scss'

import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { parse } from 'marked';

import markdownMock from './markdown-mock'
const robotoSlab = Roboto_Slab({ subsets: ['latin'] })
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })

export default function Home() {
  const editorRef = useRef(null);
  const [code, setCode] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    setText(markdownMock)
    setCode(parse(markdownMock))
  }, [])

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    const parsedCode = parse(value)
    setCode(parsedCode)
  }

  const handleTextChange = (e) => {
    const value = e.target.value
    setText(value)
    const parsedCode = parse(value)
    setCode(parsedCode)
  }

  return (
    <main className={styles.main}>
      <div className={[styles.editor, sourceCodePro.className].join(' ')}>
        {/* <Editor
          defaultLanguage="markdown"
          defaultValue={markdownMock}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        /> */}
        <textarea
          onChange={handleTextChange}
          value={text}
        >{text}</textarea>
      </div>

      <div className={[styles.markdown, robotoSlab.className].join(' ')}>
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </main>
  )
}
