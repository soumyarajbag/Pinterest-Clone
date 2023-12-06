"use client";
import { SessionProvider } from "next-auth/react"

const Provider = ({children}:{children:JSX.Element}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>

  )
}

export default Provider