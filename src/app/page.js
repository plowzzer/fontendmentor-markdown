'use client'

import { useState, useEffect } from 'react';
import { parse } from 'marked';
import Image from 'next/image';

import { sourceCodePro, robotoSlab } from './fonts'

import styles from './styles/page.module.scss'
import mdStyles from './styles/markdown.module.scss'

import markdownMock from './markdown-mock'

export default function Home() {
  // const [fileTitle, setFileTitle] = useState('welcome.md')
  const [theme, setTheme] = useState(() => {
    let saved = 'dark'
    if (typeof window !== "undefined") {
      saved = localStorage.getItem('theme')
    }

    return saved
  });
  const [code, setCode] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme);
    console.log(theme)
  }

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
      <header>
        <div className={styles.title}>
          <h1>MARKDOWN</h1>
          <div className={styles.documentName}>
            <p>Compiler</p>
            {/* <input type="text" value={fileTitle} onChange={e => setFileTitle(e.target.value)} /> */}
          </div>
        </div>

        <div>
          <button onClick={switchTheme}>
            <Image
              src={`/icons/${theme === 'dark' ? 'light' : 'dark'}.svg`}
              width={24}
              height={24}
              alt={`Mudar para visual ${theme === 'dark' ? 'claro' : 'escuro'}`}
            />
          </button>
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
          <div className={styles.sectionHeader}>MARKDOWN</div>
          <div className={[styles.editor, sourceCodePro.className].join(' ')}>
            <textarea
              onChange={handleTextChange}
              value={text}
            />
          </div>
        </div>

        <div>
          <div className={styles.sectionHeader}>
            <span>PREVIEW</span>
            <button className={styles.iconButton}>
              <Image
                src="/icons/visibility.svg"
                width={18}
                height={18}
                alt="Preview"
              />
            </button>
          </div>
          <div className={[mdStyles.markdown, robotoSlab.className].join(' ')}>
            <div dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        </div>
      </main>
    </div>
  )
}
