import React from 'react'

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'log into your account'},
])
const auth = () => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center ">
        <div className="gradient-border shadow-lg"></div>
    </main>
  )
}

export default auth