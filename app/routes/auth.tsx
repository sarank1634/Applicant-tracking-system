import React from 'react'

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'log into your account'},
])
 
const auth = () => {

    
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-b shadow-lg"></div>
      <section className='flex flex-col items-center gap-8 bg-white rounded-2xl p-10'>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <p>Log in to Continue Your Job Journey</p>
        </div>
      </section>

    </main>
  )
}

export default auth