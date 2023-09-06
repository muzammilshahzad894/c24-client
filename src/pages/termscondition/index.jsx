import React, {useState } from "react";
import FaqHeader from '../../components/FAQHeader/FaqHeader';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './termcondition.scss';
import EnglishLanguage from "./EnglishLanguage";
import DutchLanguage from "./dutchLanguage";


export default function TermsCondition() {
    const [language, setLanguage] = useState('en');
    const lang = localStorage.getItem('language');


    return (
        <div className='faq'>
            <Header />
                { lang !=='dutch' ? <EnglishLanguage /> : <DutchLanguage />}
            <Footer />
        </div>
    )
}
