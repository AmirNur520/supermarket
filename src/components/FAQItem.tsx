import React, { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="faq-item">
      <button className="faq-button" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`faq-arrow ${isOpen ? 'open' : ''}`}>›</span>
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  )
}

export default FAQItem
