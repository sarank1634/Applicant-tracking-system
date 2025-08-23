import React from 'react'

interface ScoreBadgeProps {
  score: number
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getBadgeStyles = () => {
    if (score > 70) {
      return {
        bgColor: 'bg-badge-green',
        textColor: 'text-badge-green-text',
        label: 'Strong'
      }
    } else if (score > 49) {
      return {
        bgColor: 'bg-badge-yellow',
        textColor: 'text-badge-yellow-text',
        label: 'Good Start'
      }
    } else {
      return {
        bgColor: 'bg-badge-red',
        textColor: 'text-badge-red-text',
        label: 'Needs Work'
      }
    }
  }

  const { bgColor, textColor, label } = getBadgeStyles()

  return (
    <span className={`score-badge ${bgColor} ${textColor} text-xs font-medium`}>
      {label}
    </span>
  )
}

export default ScoreBadge