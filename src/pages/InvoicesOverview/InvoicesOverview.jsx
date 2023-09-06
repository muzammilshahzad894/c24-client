import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import SingleInvoiceOverview from '../../components/SingleInvoiceOveview/SingleInvoiceOveview';
import { get_invoices_actions } from '../../state/Actions/UserAction';
import "./invoicesOverview.scss";

export default function InvoiceOverview() {
    const dispatch = useDispatch();
    const get_invoices = useSelector(state=>state.get_invoices);
    const set_invoice = useSelector(state=>state.set_invoice);
    const delete_invoices_files = useSelector(state=>state.delete_invoices_files)
    const user_info = useSelector(state=>state.user_info);
    const login_management = useSelector(state=>state.login_management)
    const [showOverview, setShowOverview] = useState(false)
    const [invoices, setInvoices] = useState([])
    /*useEffect(()=>{
        get_personal.user?.account_type==="client"&&window.location.replace("/dashboard")
    },[get_personal.user?.account_type])*/
    useEffect(()=>{
        if(user_info.user){
            dispatch(get_invoices_actions(user_info.user.token))
        }
    },[dispatch, user_info.user,set_invoice,delete_invoices_files])
    useEffect(()=>{
        if(get_invoices.data){
            let elts = get_invoices.data[0]?.map(item=>{return {...item,invoice_signed_timesheet:[],invoice_complete_invoice:[]}})
            get_invoices.data[1].map(item=>{
                console.log(item);
                if(item.invoice_signed_timesheet_path){
                    elts.find(elt=>elt.id===item.invoice_signed_timesheet_invoice_id)?.invoice_signed_timesheet.push({id:item.invoice_signed_timesheet_id,path:item.invoice_signed_timesheet_path});
                }
                return item;
            })
            get_invoices.data[2]?.map(item=>{
                if(item.invoice_complete_invoice_path){
                    elts.find(elt=>elt.id===item.invoice_complete_invoice_invoice_id)?.invoice_complete_invoice.push({id:item.invoice_complete_invoice_id,path:item.invoice_complete_invoice_path});
                }
                return item;
            })
            console.log(elts)
            setInvoices(elts)
        }else{
            setInvoices([])
        }
    },[get_invoices.data])
    console.log(invoices);
  return (
    get_invoices.loading?(
        <LoadingBox big />
    ):(
    <div className='timecards-wrapper'>
        <DashboardBar/>
        {
            set_invoice?.message &&(<MessageBox message={set_invoice?.message}/>)
        }
        <div className="timecards-header">
            <h2>
                Overview of my sent invoices and timesheet
            </h2>
            <p>
                On this page you will find an overview of all your sent invoices and 
                timesheets. 
                Downloading the document is also possible
            </p>
        </div>
        <div className="timecards-content">
            <div className="timecards-content-header" style={{gridTemplateColumns:!login_management.message?.admin?"repeat(6,1fr)":"repeat(7,1fr)"}}>
              <h3>
                  Name Company
              </h3>
              <h3>
                  Invoice amount
              </h3>
              <h3>
                  Week
              </h3>
              <h3 className='status'>
                Status
              </h3>
              <h3>
                  {login_management.message?.admin?"Upload":"Download"} the complete invoice
              </h3>
              <h3>
                  {login_management.message?.admin?"Upload":"Download"} the signed timesheet here
              </h3>
              {
                    login_management.message?.admin&&(
                        <div className="upload-invoice">
                            <button onClick={()=>setShowOverview(true)}>
                                <IoAddOutline/>
                            </button>
                        </div>
                    )
                }
            </div>
            {
                invoices?.map((item,index)=><SingleInvoiceOverview key={index} card={item}/>)
            }
            {
                showOverview&&(<SingleInvoiceOverview card={{}}/>)
            }
        </div>
        <DashboardBarBottom/>
    </div>
    )
  )
}
