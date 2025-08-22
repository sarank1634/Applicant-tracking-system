import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: " RSmart feedback for your dream job!" },
  ];
}

export default function Home() {

  const { auth, puterReady, isLoading } = usePuterStore();
  const navigate = useNavigate();

useEffect(() => {
  console.log('Home useEffect - puterReady:', puterReady, 'isLoading:', isLoading, 'isAuthenticated:', auth.isAuthenticated);
  
  if (puterReady && !isLoading && !auth.isAuthenticated) {
    console.log('Redirecting to auth from home page');
    navigate('/auth?next=/', { replace: true });
  }
}, [puterReady, isLoading, auth.isAuthenticated, navigate]);


  // Show loading state while Puter is initializing
  if (!puterReady || isLoading) {
    return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  // If not authenticated after initialization, this will be handled by useEffect redirect
  if (!auth.isAuthenticated) {
    return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return(
   <main className="bg-[url('/images/bg-main.svg')] bg-cover " >
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your Application & Resume Rating</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
    </section>

    {resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume) => (
          
          <ResumeCard 
            key={resume.id} 
            resume={resume}
          />

        ))}
      </div>
    )}
  </main>
  );
}
