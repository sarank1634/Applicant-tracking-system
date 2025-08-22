import { prepareInstructions } from 'constants'
import React, { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import FileUploader from '~/components/FileUploader'
import Navbar from '~/components/Navbar'
import { convertPdfToImage } from '~/lib/pdfToImage'
import { usePuterStore } from '~/lib/puter'
import { generateUUID } from '~/lib/utils'



const upload = () => {
   const { auth, isLoading, fs, ai ,kv} = usePuterStore();
   const naviagate = useNavigate();
   const[isPorcessing, setProcessing] = useState(false);
   const[statusText, setStatusText] = useState('');
   const[file, setFile] = useState<File | null >( null)

   const handleFileSelect = (file: File | null) => {
    setFile( file)
   } 
   
   const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
       setProcessing(true);


       setStatusText('Uploading the file ...');
       const uploadedFile = await fs.upload([file]);
       if(!uploadedFile) return setStatusText("Error : Failed to upload file");

       setStatusText("convert to image ...");
       const imageFile = await convertPdfToImage(file);
       if(!imageFile.file || imageFile.error) {
         return setStatusText(`Error: ${imageFile.error || 'Failed to Convert PDF to image'}`);
       }
       
       setStatusText('uploading the image...');
       const uploadedImage = await fs.upload([imageFile.file]);
       if(!uploadedImage) return setStatusText("Error : Failed to upload image");
       
       setStatusText('Preparing data ...')

       const uuid = generateUUID();
       const data = {
         id: uuid,
         resumePath: uploadedFile.path,
         imagePath: uploadedImage.path,
         companyName, jobTitle, jobDescription,
         feedback: '',
       }
       await kv.set(`resume:${uuid}`, JSON.stringify(data));
       setStatusText('Analysis completed, redirecting... ');
       console.log(data);
    
       setStatusText('Analyzing ...');

       const feedback = await ai.feedback(
          uploadedFile.path,
          prepareInstructions({jobTitle, jobDescription})
       )

       if(feedback) return setStatusText('Error: Failed to analyz resume');

       const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement >) => {
     e.preventDefault();
     const form = e.currentTarget.closest('form');
     if(!form) return;
     const formData = new FormData(form);

     const companyName = formData.get('company-name') as string;
     const jobTitle = formData.get('job-title') as string;
     const jobDescription = formData.get('job-description') as string;
     
      if(!file) return;

      handleAnalyze({companyName, jobTitle, jobDescription, file});



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
            {!isPorcessing && (

                <form id="upload -form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className="form-div">
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name='company-name' placeholder='Company Name' id='company-name' />
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text" name='job-title' placeholder='Job Title' id='job-title' />
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-description">Job description</label>
                        <textarea rows={5} name='job-description' placeholder='Job Description' id='job-description' />
                    </div>
                    <div className="form-div">
                        <label htmlFor="uploader">Uploader Resume</label>
                        <FileUploader onFileSelect= {handleFileSelect}  />
                    </div>

                    <button className='primary-button' type='submit'>
                        Analyze Resume
                    </button>
                </form>
            )}
        </div>
    </section>
    </main>
  )
}

export default upload;