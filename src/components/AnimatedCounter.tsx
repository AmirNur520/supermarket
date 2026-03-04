import React, { useState, useEffect } from 'react'

interface AnimatedCounterProps {
  value: number
  label: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, label }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < value ? prev + Math.ceil(value / 50) : value))
    }, 30)
    return () => clearInterval(interval)
  }, [value])

  return (
    <div className="stats-item">
      <div className="stats-number">{count.toLocaleString('ru-RU')}</div>
      <div className="stats-label">{label}</div>
    </div>
  )
}

export default AnimatedCounter
