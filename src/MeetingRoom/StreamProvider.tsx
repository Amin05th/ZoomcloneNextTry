import React, { useContext } from 'react'

const StreamContext = React.createContext('')

export function useStream() {
  return useContext(StreamContext)
}

export function StreamProvider<T>({ children }: T) {
  const Stream = navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      return stream
    })

  return (
    <StreamContext.Provider value={{ Stream }}>
      {children}
    </StreamContext.Provider>
  )
}
