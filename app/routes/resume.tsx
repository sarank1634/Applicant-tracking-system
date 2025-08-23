import { useNavigate, useParams } from "react-router";
import { resumes } from "../../constants";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import { usePuterStore } from "~/lib/puter";

export function meta({ params }: Route.MetaArgs) {
  const resume = resumes.find(r => r.id === params.id);
  return [
    { title: `Resumind | ' Review'}` },
    { name: "description", content: "Detailed overview of your resume" },
  ];
} 

export default function Resume() {
  const {auth,isLoading, fs, kv, puterReady} = usePuterStore();

  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const[resumeUrl, setResumeUrl] = useState('');
  const[feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const resume = resumes.find(r => r.id === id);

  useEffect(() => {
    console.log('Resume useEffect - puterReady:', puterReady, 'isLoading:', isLoading, 'isAuthenticated:', auth.isAuthenticated);
    
    if (puterReady && !isLoading && !auth.isAuthenticated) {
      console.log('Redirecting to auth from resume page');
      navigate(`/auth?next=/resume/${id}`, { replace: true });
    }
  }, [puterReady, isLoading, auth.isAuthenticated, navigate, id]);

  useEffect(() => { 
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if(!resume) return;
      const data = JSON.parse(resume);
       
      const resumeBlob = await fs.read(data.resumePath);
      if(!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageData = await fs.read(data.imagePath);
      if(!imageData) return;
      const imageBlob = new Blob([imageData], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({resumeUrl, imageUrl, feedback :data.feedback})
    }
    loadResume();
}, [id])

  if (!resume) {
    return (
      <main className="!pt-0">
        <nav className="resume-nav">
         <Link to="/" className="back-button"> 
         <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">Back to HomePage</span>
    </Link>  
        </nav>
        <div className="flex flex-row w-full max-lg:flex-col-reverse">
          <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticy top-0 items-center justify-center" >    
            {imageUrl &&  resumeUrl && (

           <div className="animatein fade-in duration-1000 gradient-border max-sm:m-0 max-wxl:h-fit w-fit">
             <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <img src={imageUrl} 
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                  alt="" />
             </a>
          </div>
            )} 
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to='/' className="back-button ">
           <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
           <span className="text-gray-800 text-sm font-semibold">Back to HomePage</span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max:lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticy top-0 items-center justify-center">
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                Summary ATS Details
              </div>
  
      ): (
          <img src="/image/resume-scan-2.gif" className="w-full" />
          )}
        </section>
        </section>
      </div>
      {/* <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{resume.companyName}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{resume.jobTitle}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Resume Preview</h3>
                <img 
                  src={resume.imagePath} 
                  alt="Resume preview"
                  className="w-full border rounded-lg shadow-sm"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Overall Score</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {resume.feedback.overallScore}/100
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>ATS Score:</span>
                    <span className="font-semibold">{resume.feedback.ATS.score}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content:</span>
                    <span className="font-semibold">{resume.feedback.content.score}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Structure:</span>
                    <span className="font-semibold">{resume.feedback.structure.score}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Skills:</span>
                    <span className="font-semibold">{resume.feedback.skills.score}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tone & Style:</span>
                    <span className="font-semibold">{resume.feedback.toneAndStyle.score}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
}
