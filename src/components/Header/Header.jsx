import React from 'react'
import { BsHeart, BsPerson, BsSearch } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./header.scss"


export default function Header({Child,contact}) {

  const get_liked = useSelector(state=>state.get_liked)
  const research = useSelector(state=>state.research);
  const user_info = useSelector(state=>state.user_info)
  const freelancer = !(research.data&&research.data[0]?.account_type==="freelancer");

  //if freelancer is false then it means we are not looking for freelancers in the search, therefore the user is a client
  return (
    <div className='header_container'>
      <div className="header">
        <div className="header_img_links">
            <Link to="/">
                <img src="/images/logo.png" alt="" />
            </Link>
            <div className="header_links">
              {
                contact?(
                  <>
                    <Link to="/join">
                        I want to become freelancer
                    </Link>
                    <Link to="/">
                        For companies
                    </Link>
                    <Link to="/">
                        For freelancers
                    </Link>
                    <Link to="/">
                        About us
                    </Link>
                    <Link to="/faq">
                      FAQ
                    </Link>
                  </>
                ):(
                  <>
                    <Link to="">
                        Help & Contact
                    </Link>
                    <Link to="">
                        For companies
                    </Link>
                    <Link to="">
                        For freelancers
                    </Link>
                    <Link to="">
                        About us
                    </Link>
                  </>
                )
              }
            </div>
        </div>
        <div className="profile">
          <div>
            <Link to="/search">
              <BsSearch/>
              Seek
            </Link>
          </div>
          <div>
            <Link to="/saved-profiles" state={{freelancer}}>
              <BsHeart/>
              {get_liked.data?.length||0}
            </Link>
          </div>
          <div>
            <Link to={user_info.user?.token?"/dashboard":"/login"}>
                <BsPerson/>
                My Curant24
            </Link>
          </div>
        </div>
      </div>
      {Child}
    </div>
  )
}
