import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "../components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: " RSmart feedback for your dream jb!uter!" },
  ];
}

export default function Home() {
  return(
   <main className="bg-[url('/images/bg-main.svg')] bg-cover " >
    <Navbar />

    <section className="main-section">
      <div className="page-heading">
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
