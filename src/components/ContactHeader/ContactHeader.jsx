import React from 'react'
import "./contactHeader.scss"

export default function ContactHeader({client,form}) {

    if( !client || typeof(client)!=="string"){
        client ="client"
    }

  return (
    <div className='contact-header'>
        <div className='contact-header-link'>
            {
                form?(
                <>
                    <p>
                        {client+"s"}
                    </p>
                    <p>
                        {">"}
                    </p>
                    <p>
                        Contact with Curant24 : We are happy to help you
                    </p>
                </>
                ):(
                    <>                    
                        <p>
                            {client+"s"}
                        </p>
                        <p>
                            {">"}
                        </p>
                        <p>
                            Contact with Curant24
                        </p>
                    </>
                )
            }
        </div>
        <div className="contact-header-banner">
            <div>
                {
                    form?(
                        <>
                            <h1>
                                We are happy to help you: 
                            </h1>
                            <h3>
                                Do you have a question or request? Let us <br />
                                know via the contact form below
                            </h3>
                        </>

                    ):(
                        <>
                            <h1>
                                Contact with <br />
                                Curant24
                            </h1>
                            <h3>
                                We are happy to help you.
                            </h3>
                        </>
                    )
                }

            </div>
            <div>
                <img src="/images/contactLogo.png" alt="" />
            </div>
        </div>
        {/*
            client&&(
                <div>
                    <Link to="/contact-form" state={{client:"client",form:true}} style={{textDecoration:"none"}}>
                        <button>
                            Go to our contact form
                        </button>
                    </Link>
                </div>
            )
            */}
    </div>
  )
}
