import { createContext, useContext } from 'react'

export const TerminalContext = createContext<() => void>(() => {})
export const useTerminal = () => useContext(TerminalContext)
