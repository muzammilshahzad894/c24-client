import React from 'react'
import FaqHeader from '../../components/FAQHeader/FaqHeader';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './privacypolicy.scss';
import EnglishLanguage from "./englishLanguage";
import DutchLanguage from "./dutchLanguage";


export default function PrivacyPolicy() {
    const lang = localStorage.getItem('language');

    return (
        <div className='faq'>
            <Header />
                { lang !=='dutch' ? <EnglishLanguage /> : <DutchLanguage />}
            <Footer />
        </div>
    )
}
