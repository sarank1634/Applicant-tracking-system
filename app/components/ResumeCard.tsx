import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';

const ResumeCard = ({resume}: {resume: Resume}) => {
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
      <div className='resume-card-header flex'>
      <div className="flex flex-col gap-2 ">
            <h2 className='!text-black font-bold  break-words'> {resume.companyName} </h2>
            <h3 className='!text-lg break-words text-gray-500'>{resume.jobTitle}</h3>
        </div>
          <div className='flex-shirnk-0'>
             <ScoreCircle score={resume.feedback.overallScore} />
             </div>
      </div>
        <div className="gradient-border anime-in fade duration-1000">
          <div className="w-full h-full">
            <img src={resume.imagePath} alt="" className='w-full border rounded-lg shadow-sm' />           
          </div>
        </div>
  
         
    </Link>
  );
};

export default ResumeCard;