import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import "./organisatiesElement.scss"
import { add_organasation_action, get_all_assignements_action, get_client_orga_action, get_profile_ratings_action, invite_freelancer_action } from '../../state/Actions/UserAction'
import { GoInfo } from 'react-icons/go'

export default function OrganisatiesElement({organasation}) {
  const [toggleShowMore, setToggleShowMore] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const user_info = useSelector(state=>state.user_info);
  const set_orga = useSelector(state=>state.set_orga);
  const login_management = useSelector(state=>state.login_management);
  const get_all_assignements = useSelector(state=>state.get_all_assignements)
  const invite_freelancer = useSelector(state=>state.invite_freelancer);
  const get_profile_ratings = useSelector(state=>state.get_profile_ratings)

  const msgRef = useRef({});
  const inviteRef = useRef({});
  const inputRef = useRef([]);
  const dispatch = useDispatch()
  let nv = organasation.props&&organasation.props.organasation.nv;


  useEffect(()=>{
    inputRef.current = inputRef.current.map(item=>{
      for(let key in organasation){
        if(key===item.name){
          item.defaultValue = organasation[key]||"";
          item.placeholder = 'empty';
        }
      }
      return item;
    })
  },[dispatch, user_info.user, user_info.user.token, set_orga, organasation])


  useEffect(()=>{
    dispatch(get_profile_ratings_action(user_info.user.token,organasation.user_id))
    dispatch(get_all_assignements_action(user_info.user.token,organasation.user_id))
    dispatch(get_client_orga_action(user_info.user.token,organasation.user_id))
  },[dispatch, organasation.user_id, user_info.user.token])

  useEffect(()=>{
    if(invite_freelancer.message){
        setShowInvite(false);
    }
},[invite_freelancer.message])

  useEffect(()=>{
    if(showInvite){
        window.scrollTo(0,0)
        document.body.style.height = "100vh";
        document.body.style.overflow ="hidden";
    }else{
        document.body.style.height = "auto";
        document.body.style.overflow = "auto"
    }
},[showInvite])

  const saveData = ()=>{
    let data = {};
    console.log(inputRef.current)
    inputRef.current.map(item=>{
      return data[item.name] = item.value;
    })
    data.nv = nv;
    data.id = organasation.id;
    console.log(data)
    dispatch(add_organasation_action(data,user_info.user.token))
    setToggleShowMore(false)
  }

  const inviteHandler = ()=>{
    console.log(inviteRef.current["assignement_id"].value);
    if(inviteRef.current["assignement_id"].value?.length>0&&inviteRef.current["message"].value?.length>0){
        dispatch(invite_freelancer_action(
            {freelancer_id:get_profile_ratings.profile_ratings?.user?.id,
            assignement_id:inviteRef.current["assignement_id"].value,
            message:inviteRef.current["message"].value},
            user_info.user?.token
        ))
    }
  }
  return (
    <div className={'orga-elt '+(toggleShowMore?" more":"")}>
      <div className="orga-content">
        <div className="name" style={{margin:user_info.user?.account_type==="client"?"0px":"20px 0"}}>
          {
            login_management.message?.admin?(
              user_info.user?.account_type==="client"?(
                <div style={{display:"block",margin:"0px"}}>
                  <input type="text" name='freelancer_name' style={{margin:"5px 0px"}} defaultValue={organasation.freelancer_name} ref={ref=>ref!==null&&(inputRef.current.push(ref))}/>
                  <input type="text" name='name' style={{margin:"5px 0px"}} defaultValue={organasation.name} ref={ref=>ref!==null&&(inputRef.current.push(ref))}/>
                </div>
              ):(
                <input type="text" name='name' defaultValue={organasation.name} ref={ref=>ref!==null&&(inputRef.current.push(ref))}/>
              )
            ):(
              <div>
                <p>
                  {organasation.name}
                </p>
                <p>
                  {organasation.freelancer_name}
                </p>
              </div>
            )
          }
        </div>

        <div className="bureau">
          {
            login_management.message?.admin?(
              <input type="text" name="bureau" defaultValue={"Curant24-The Netherlands"} id=""ref={ref=>ref!==null&&(inputRef.current.push(ref))} />
            ):(
              <p>
                {organasation.bureau}
              </p>
            )
          }
        </div>

        <div className="type">
        {
            login_management.message?.admin?(
              <input type="text" name="orga_type" defaultValue={user_info.user?.account_type ==="client"?"Freelancers":"Employers"} id="" ref={ref=>ref!==null&&(inputRef.current.push(ref))} />
            ):(
              <p className='type'>
                {organasation.orga_type}
              </p>
            )
          }
        </div>

        <div className="more-info" onClick={()=>setToggleShowMore(!toggleShowMore)}>
          <p>
            more information
          </p>
          <MdOutlineArrowForwardIos className={toggleShowMore?"down":""} />
        </div>
        {
          user_info.user?.account_type==="client"&&(
            <div className="invite" onClick={()=>setShowInvite(true)}>
                <button>
                    Invite to job
                </button>
            </div>
          )
        }
        {
          login_management.message?.admin&&(
            <button className="save" onClick={()=>saveData()}>
              <AiOutlineCheck/>
            </button>
          )
        }
      </div>
      <div className="more-info-content">
        <div className="more-info-profile">
          <div className="more-info-profile-header">
            <h2>
              Profile
            </h2>
          </div>
          <div className="more-info-profile-content">
            <div className="more-info-profile-content-row">
                  <div className="more-info-profile-content-column">
                    <span>
                      Name
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='profile_name' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Selector description
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='selector_description' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Legal Form {">"} description
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='legal_form_description' placeholder='Empty' />
                  </div>
              </div>
              <div className="more-info-profile-content-row">
                    <div className="more-info-profile-content-column">
                      <span>
                        Trade Name
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='trade_name' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        {" "}
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='no_name' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Employees class
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='employees_class' placeholder='Empty' />
                    </div>
                </div>
                <div className="more-info-profile-content-row">
                    <div className="more-info-profile-content-column">
                      <span>
                        Short Name
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))}name='short_name' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Is branch office
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='is_branch_office' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Employees class description
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='employees_class_description' placeholder='Empty' />
                    </div>
                </div>
                <div className="more-info-profile-content-row">
                    {/* <div className="more-info-profile-content-column">
                      <span>
                        Type
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='orga_type' placeholder='Employer' />
                    </div> */}
                    <div className="more-info-profile-content-column">
                      <span>
                        Is active organization
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='is_active_organasation' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Number of FTE
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='number_of_fte' placeholder='Empty' />
                    </div>
                </div>
                <div className="more-info-profile-content-row">
                    <div className="more-info-profile-content-column">
                      <span>
                        KvK main number
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='KvK_main_number' placeholder='Empty' />
                      <span>
                        KvK sub number
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='KvK_sub_number' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Legal entity ID 
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='legal_entity_ID' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Number of Employees 
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='number_of_employees' placeholder='Empty' />
                    </div>
                </div>
                <div className="more-info-profile-content-row">
                    <div className="more-info-profile-content-column">
                      <span>
                        Country Code
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='coutry_code' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Legal Form {">"} start date 
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='legal_form_start_date' placeholder='Empty' />
                    </div>
                    <div className="more-info-profile-content-column">
                      <span>
                        Termination date (employer is unregistered from KVK) 
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='termination_date' placeholder='Empty' />
                    </div>
                </div>
                <div className="more-info-profile-content-row">
                    <div className="more-info-profile-content-column">
                      <span>
                        Sector
                      </span>
                      <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='sector' placeholder='Empty' />
                    </div>
                </div>
            </div>
        </div>


        <div className="more-info-profile">
          <div className="more-info-profile-header">
            <h2>
              Contact 
            </h2>
          </div>
          <div className="more-info-profile-content">
            <div className="more-info-profile-content-row">
                  <div className="more-info-profile-content-column">
                    <span>
                      Website
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='website' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Email
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='email' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Phone
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='phone' placeholder='Empty' />
                  </div>
            </div>
            <div className="more-info-profile-content-row">
              <h2>Adresses</h2>
            </div>
            <div className="more-info-profile-content-row">
                  <div className="more-info-profile-content-column">
                    <span>
                      Main address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='main_address' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Visit address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='visit_address' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Report Address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='report_address' placeholder='Empty' />
                  </div>
            </div>
            <div className="more-info-profile-content-row">
                  <div className="more-info-profile-content-column">
                    <span>
                      Postal Address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='postal_address' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Billing Address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='billing_address' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Work Address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='work_address' placeholder='Empty' />
                  </div>
            </div>
            <div className="more-info-profile-content-row">
                  <div className="more-info-profile-content-column">
                    <span>
                      Reminder Address
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='reminder_address' placeholder='Empty' />
                  </div>
            </div>
          </div>
        </div>

        <div className="more-info-profile">
          <div className="more-info-profile-header">
            <h2>
              Labor 
            </h2>
          </div>
          <div className="more-info-profile-content">
            <div className="more-info-profile-content-row">
                  <div className="more-info-profile-content-column">
                    <span>
                      Delivery date general term  
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='delivery_date_general_term' placeholder='Empty' />
                  </div>
                  <div className="more-info-profile-content-column">
                    <span>
                      Working hours/week
                    </span>
                    <input type="text" ref={ref=>ref!==null&&(inputRef.current.push(ref))} name='working_hours' placeholder='Empty' />
                  </div>
            </div>
          </div>
        </div>
      </div>
      {
          user_info.user?.account_type==="client"&&showInvite&&(
            <div className="apply" tabindex="-1">
              <div className="apply-bg" onClick={()=>setShowInvite(false)}></div>
              <div className="apply-dialog "> 
                <div className="apply-content">
                    <div className="apply-header">
                        <h4 className="apply-title">
                        <b>
                            Send message
                        </b>
                        </h4>
                        <div>
                            <AiOutlineClose onClick={()=>setShowInvite(false)}/>
                        </div>
                    </div>
                    <div className="apply-body">
                        <div className="apply-form">
                            <p>
                                Choose the project you want to invite the freelancer to*
                            </p>
                            <select name="assignement_id" id="" ref={ref=>ref!==null&&(inviteRef.current[ref.name] = ref)}>
                                {
                                    get_all_assignements.data?.map((item,idx)=>(
                                        <option value={item.id} key={idx}>{item.job_name}</option>
                                    ))
                                }
                            </select>
                            <b>
                                Message
                            </b>
                            <textarea name="message" id="" placeholder='Describe the project or position that you are hiring for. It helps to be detailed as well to give some information about you and your company.'  maxLength={"3000"} cols="30" rows="5"ref={ref=>ref!==null&&(inviteRef.current[ref.name] = ref)} ></textarea>
                        </div>
                    </div>
                    <div className="apply-footer">
                        <button type="button" onClick={()=>inviteHandler()} >{invite_freelancer.loading?"... Sending":"Send"}</button>
                        <button type="button" className="back" onClick={()=>setShowInvite(false)}>Cancel</button>
                    </div>
                </div>
              </div>
            </div>
          )
        }
        {
            invite_freelancer.message&&(
              <div className='message-box-small' ref={ref=>ref!==null&&(msgRef.current = ref)}>
                  <div>
                      <div>
                          <GoInfo/>
                          <p>
                              Notice
                          </p>
                      </div>
                      <AiOutlineClose style={{cursor:"pointer"}} onClick={()=>msgRef.current.style.display="none"}/>
                  </div>
                  <div>
                      <p>
                          Job invite email was sent. Check your email inbox for the reply from this member.
                      </p>
                  </div>
              </div>
            )
        }
    </div>
  )
}
