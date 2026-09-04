import { useEffect, useState } from 'react'

export function useTypewriter(words: string[], typeSpeed = 70, holdMs = 1800) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout: number

    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? typeSpeed / 2 : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, holdMs])

  return text
}
