import React from 'react'
import ScoreGauge from './ScoreGauge'

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor = score > 70 ? 'text-green-600' 
  : score > 49 ? 'text-yellow-600' : 'text-red-600';
return (
  <div className="resume-summary">
    <div className="category">
      <div className="flex flex-row gap-2 items-center justify-center">
      <p className='text-2xl'>{title}</p>
      </div>
      <p className='text-2xl'>{score}</p>
      <span className={textColor}>{score}/100</span>
    </div>
  </div>
)
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className="flex flex-row items-center gap-8 p-4">
        <ScoreGauge score={ feedback.overallScore }/>

        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>Your Resume Score</h2>
          <p className='text-gray-500'>This score is calculated based on the variable listed below</p>
        </div>

       <Category title="Tone & Style" score={ feedback.toneAndStyle.score}/>
       <Category title="content" score={ feedback.content.score}/>
       <Category title="structure" score={ feedback.structure.score}/>
       <Category title="skills " score={ feedback.skills.score}/>

      </div>
    </div>
  )
}

export default Summary;