import React, { useState, type FormEvent } from 'react'
import Navbar from '~/components/Navbar'


const upload = () => {
   const[isPorcessing, setProcessing] = useState(true)
   const[statusText, setStatusText] = useState('')


   const handleSubmit = (e: FormEvent<HTMLFormElement >) => {

   }
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover " >
    <Navbar />


    <section className="main-section">
        <div className="page-heading py-16">
            <h1 >Smart feedback for your dream job</h1>
            {isPorcessing ? (
               <>
               <h2>{statusText}</h2>
                 <img src="/images/resume-scan.gif" className='w-full' alt="" />
               </>
            ):(
                <h2>Drop your resume for an ATS score and improvement tips</h2>
            )}
            {!is Processing && (

                <form id="upload -form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className="form-div">
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name='company-name' placeholder='Company Name' id='company-name' />
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-title">Company Name</label>
                        <input type="text" name='job-title' placeholder='Job Title' id='job-title' />
                    </div>
                </form>

            )}
        </div>
    </section>
    </main>
  )
}

export default upload;