import { useParams } from "react-router";
import { resumes } from "../../constants";
import Navbar from "../components/Navbar";

export function meta({ params }: Route.MetaArgs) {
  const resume = resumes.find(r => r.id === params.id);
  return [
    { title: `Resume - ${resume?.companyName || 'Not Found'}` },
    { name: "description", content: "Resume details and feedback" },
  ];
}

export default function Resume() {
  const { id } = useParams();
  const resume = resumes.find(r => r.id === id);

  if (!resume) {
    return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">Resume not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />
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
      </div>
    </main>
  );
}
