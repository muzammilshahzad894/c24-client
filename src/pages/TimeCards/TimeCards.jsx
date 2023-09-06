import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import TimeCard from '../../components/Single-timecard/TimeCard';
import { get_timecard_action } from '../../state/Actions/UserAction';
import "./timeCards.scss";

export default function TimeCards() {
    const dispatch = useDispatch();
    const get_timecards = useSelector(state=>state.get_timecards);
    const set_timecard = useSelector(state=>state.set_timecard);
    const delete_timecard_file = useSelector(state=>state.delete_timecard_file)
    const user_info = useSelector(state=>state.user_info);
    const get_personal = useSelector(state=>state.get_personal);
    const login_management = useSelector(state=>state.login_management);
    /*useEffect(()=>{
        get_personal.user?.account_type==="client"&&window.location.replace("/dashboard")
    },[get_personal.user?.account_type])*/
    useEffect(()=>{
        if(user_info.user){
            dispatch(get_timecard_action(user_info.user.token))
        }
    },[dispatch, user_info.user,set_timecard,delete_timecard_file])
    
  return (
    get_timecards.loading?(
        <LoadingBox big />
    ):(
    <div className='timecards-wrapper'>
        <DashboardBar/>
        {
            set_timecard.data &&(<MessageBox message={set_timecard.data}/>)
        }
        <div className="timecards-header">
            <div>
                <h2>
                    Send your Timesheet and invoice
                </h2>
                <p>
                    {
                        get_personal.user?.account_type==="freelancer"
                        ?(
                            <b>
                                You must download your timesheet on this page. And then <br />
                                have it signed by your client and upload it again on this page. <br />
                                <br />
                                On this page you have to upload your invoice after every <br />
                                working week. You can also download a sample invoice.
                            </b>
                        )
                        :
                        (
                            <b>
                                On this page you have to download the invoice and timesheet  <br />
                                from the freelancer who works for your company. <br />
                                !Please do not forget to approve or reject  the documents
                            </b>
                        )
                    }
                </p>
            </div>
            <div className="timecards-header-title">
                <h1>
                    {
                        login_management.message?.admin&&(user_info.user?.account_type?.toUpperCase()+" EDIT PAGE")
                    }
                </h1>
            </div>
        </div>
        <div className="timecards-content">
            <div className="timecards-content-header" style={{gridTemplateColumns:"repeat(5,1fr)"}}>
                {
                    user_info.user?.account_type==="client"?(
                        <>
                        <div style={{display:"block"}}> 
                            <h3>
                                Name freelancer
                            </h3>
                            <h3>
                                Name Company
                            </h3>
                        </div>
                        </>
                    ):(
                        <h3>
                            Employer
                        </h3>
                    )
                }
              <h3 className='status'>
                  Status
              </h3>
              <h3>
                  Week
              </h3>
              <h3>
                  {user_info.user?.account_type==="freelancer"?"Download  Timesheet, PDF here":"Download the signed timesheet from the freelancer here"}
              </h3>
              <h3>
                  {user_info.user?.account_type==="freelancer"?"Upload signed timesheet, PDF here":"Download the complete invoice from the freelancer here"}
              </h3>
              <h3>

              </h3>
            </div>
            {
                get_timecards.data?.length>0?get_timecards.data.map((item,index)=><TimeCard key={index} timesheet={get_timecards.data.timesheet} signed_timesheet={get_timecards.data.signed_timesheet} card={item}/>)
                :
                (user_info.user?.account_type==="freelancer"&&(
                    <div className="empty_timecard_text">
                        <div>

                        </div>
                        <div>

                        </div>
                        <div>
                            
                        </div>
                        <div>
                            <h4>
                                Download empty <br />
                                Invoice example here
                            </h4>
                        </div>
                        <div>
                            <h4>
                                Upload your completed <br />
                                invoice in PDF format here
                            </h4>
                        </div>
                    </div>
                )
                )
            }
        </div>
        <DashboardBarBottom/>
    </div>
    )
  )
}
