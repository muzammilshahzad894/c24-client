import React, { useEffect, useRef, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import SingleContract from '../../components/SingleContract/SingleContract'
import { add_contract_action, get_contract_action } from '../../state/Actions/UserAction'
import "./contracts.scss"

export default function Contracts() {
    const inputRef = useRef();
    const user_info = useSelector(state=>state.user_info);
    const get_contract = useSelector(state=>state.get_contract);
    const add_contract = useSelector(state=>state.add_contract);
    const login_management = useSelector(state=>state.login_management);
    const [showNewContract, setShowNewContract] = useState(false)
    const [contracts, setContracts] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        window.scrollTo(0,0)
        dispatch(get_contract_action(user_info.user.token))
    },[dispatch, user_info.user.token,add_contract])
    useEffect(()=>{
        if(get_contract.data){
            get_contract.data[0]=get_contract.data[0]?.map(item=>{
                item.agreement_2_signatures = get_contract.data[1]?.filter(elt=>elt.contract_id===item.id)?.map(elmnt=>elmnt.agreement_2_signatures);
                item.signed_agreement = get_contract.data[2]?.filter(elt=>elt.contract_id===item.id)?.map(elmnt=>elmnt.signed_agreement);
                item.three_party_agreement = get_contract.data[3]?.filter(elt=>elt.contract_id===item.id)?.map(elmnt=>elmnt.three_party_agreement);
                return item;
            })
            console.log(get_contract.data[0]);
            setContracts(get_contract.data[0]);
        }
    },[get_contract])
    
    const handleUploadContract = (e)=>{
        let data = new FormData();
        data.append("file",e.target.files[0])
        dispatch(add_contract_action(data,user_info.user.token))
        setShowNewContract(false);
    }
  return (
    get_contract.loading?(
        <LoadingBox big/>
    ):(
    <div className='contracts-wrapper'>
        <DashboardBar/>
        <div className="contracts-content">
            <div className="header" style={{justifyContent:"space-between"}}>
                <h2>
                    Contracts 
                </h2>
                <span>
                    On this page you can download the three-party contract of services for <br />
                    mediation <br /><br />
                
                    Note : After reading the agreement you can sign the agreement and then <br />
                    upload it on this page. So that Curant24 can approve it.
                </span>
                <input type="file" name="file" onChange={e=>handleUploadContract(e)} id="" ref={ref=>ref!==null&&(inputRef.current = ref)} style={{display:"none"}} />
                {
                    login_management.message?.admin&&(
                        <div className="upload-contract">
                            <button onClick={()=>setShowNewContract(true)}>
                                <IoAddOutline/>
                            </button>
                        </div>
                    )
                }
            </div>
            <div className="contracts">
                {
                   contracts.map(item=>(
                        <SingleContract contract={item}/>
                    ))
                }
                {
                    showNewContract&&(
                        <SingleContract contract={{state:"option1"}}/>
                    )
                }
            </div>
        </div>
        <DashboardBarBottom/>
    </div>
    )
  )
}
