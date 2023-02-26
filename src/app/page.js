'use client'
import { Roboto_Slab, Source_Code_Pro, Open_Sans } from 'next/font/google'
import { useState, useEffect } from 'react';
import { parse } from 'marked';
import Image from 'next/image';


import styles from './page.module.scss'
import markdownMock from './markdown-mock'
const robotoSlab = Roboto_Slab({ subsets: ['latin'] })
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'], weight: '400' })

export default function Home() {
  const [fileTitle, setFileTitle] = useState('welcome.md')
  const [code, setCode] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    setText(markdownMock)
    setCode(parse(markdownMock))
  }, [])

  const handleTextChange = (e) => {
    const value = e.target.value
    setText(value)
    const parsedCode = parse(value)
    setCode(parsedCode)
  }

  return (
    <div className={styles.app}>
      <header className={openSans.className}>
        <div className={styles.title}>
          <h1>MARKDOWN</h1>
          <div className={styles.documentName}>
            <p>Compiler</p>
            {/* <input type="text" value={fileTitle} onChange={e => setFileTitle(e.target.value)} /> */}
          </div>
        </div>

        <div>
          {/* <button>
            <Image
              src="/icons/delete.svg"
              width={24}
              height={24}
              alt="Delete"
            />
          </button> */}
          {/* <button>
            <Image
              src="/icons/save-dark.svg"
              width={18}
              height={18}
              alt="Delete"
              style={{ marginRight: '4px' }}
            />
            Save Changes
          </button> */}
        </div>
      </header>

      <main className={[styles.main, robotoSlab].join(' ')}>
        <div>
          <div className={[styles.sectionHeader, openSans.className].join(' ')}>MARKDOWN</div>
          <div className={[styles.editor, sourceCodePro.className].join(' ')}>
            <textarea
              onChange={handleTextChange}
              value={text}
            />
          </div>
        </div>

        <div>
          <div className={[styles.sectionHeader, openSans.className].join(' ')}>PREVIEW</div>
          <div className={[styles.markdown, robotoSlab.className].join(' ')}>
            <div dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        </div>
      </main>
    </div>
  )
}
