import React from 'react'
import { BsSearch } from 'react-icons/bs';
import "./faqHeader.scss";

export default function FaqHeader({handler,type}) {
  return (
    <div className='faq-header'>
        <h1>
            FAQ - {type}
        </h1>
        <div className="faq-header-search-bar">
            <BsSearch/>
            <input type="text" placeholder='Search by keywords' onChange={e=>handler(e)}/>
        </div>
    </div>
  )
}
