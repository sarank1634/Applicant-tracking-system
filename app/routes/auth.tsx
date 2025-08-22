import React, { useEffect } from 'react'
import { Welcome } from '~/welcome/welcome'
import { usePuterStore } from '../lib/puter'
import { useLocation, useNavigate } from 'react-router'


export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'log into your account'},
])

const auth = () => {
  const {isLoading, auth} = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

useEffect(() => {
  auth.isAuthenticated();
}, [auth.isAuthenticated, next]);


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center ">
        <div className="gradient-border shadow-lg">
          <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
             <div className="flex flex-col items-center gap-2 text-center" >
            <h1>Welcome</h1>
            <h2>Log in to your account</h2>
             </div>
               {isLoading ? (
                <button className='auth-button animate-pulse'>
                  <p>Signing you in ...</p>
                </button>
               ) : (
                <> {
                  auth.isAuthenticated ? (
                    <button className='auth-button'>
                      Log Out 
                    </button>
                  ) : (
                    <button className='auth-button' onClick={() => auth.signIn(next)}>
                         <p>Log in</p>
                    </button>
                  )
                }
                </>
               )}
          </section>
        </div>
    </main>
  )
}

export default auth