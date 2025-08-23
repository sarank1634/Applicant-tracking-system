import React from 'react'
import ScoreGauge from './ScoreGauge'

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className="flex flex-row items-center gap-8 p-4">
        <ScoreGauge score={ feedback.overallScore }/>
      </div>
    </div>
  )
}

export default Summary;