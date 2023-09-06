import React, { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai';
import "./faqQuestion.scss";

export default function FaqQuestion({question,answer}) {
    const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className={`faq-question ${showAnswer&&"show"}`} onClick={()=>setShowAnswer(!showAnswer)}>
        <div className="faq-question-header">
            <h4>
                {question}
            </h4>
            <AiOutlineDown/>
        </div>
        <div className="faq-question-info">
            {
                answer?.split("\n").map(item=>(
                    <p>
                        {item}
                    </p>
                ))
            }
        </div>
    </div>
  )
}
