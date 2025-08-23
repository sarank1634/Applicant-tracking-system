import React from 'react'
import ScoreGauge from './ScoreGauge'

const Category = ({ title, score }: { title: string; score: number }) => {
return (
  <div className="resume-summary">
    {title}
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

       

      </div>
    </div>
  )
}

export default Summary;