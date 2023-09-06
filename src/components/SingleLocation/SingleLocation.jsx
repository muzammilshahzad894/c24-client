import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_locations_action, delete_location_action, get_locations_action, set_locations_action, start_location_saving_action } from '../../state/Actions/UserAction';
import "./singleLocation.scss"

export default function SingleLocation({data,nv=false}) {
    const start_saving = useSelector(state=>state.start_saving_locations);
    const user_info = useSelector(state=>state.user_info);
    const dispatch = useDispatch();
    const inputRef = useRef({});
    
    useEffect(()=>{

        const start_saving_data = ()=>{
            //start saving
            let info = {};
            let is_a_field_filled = false;
            console.log(inputRef.current);
            for(const [key,item] of Object.entries(inputRef.current)){
                if(item){
                    if(item.value.length>0){
                        is_a_field_filled = true;
                    }
                    info[key] = item.value;
                }
            }
            console.log(info)
            if(is_a_field_filled){
                info.id = data.id;
                if(nv){
                    //add new location action
                    dispatch(add_locations_action(user_info.user.token,info))
                }else{
                    // update location action
                    dispatch(set_locations_action(user_info.user.token,info))
                }
            }
            dispatch(start_location_saving_action(false))
            dispatch(get_locations_action(user_info.user.token))
        }

        //call of function whenever start is true
        if(start_saving.start){
            start_saving_data();
        }
    },[dispatch, nv, start_saving, user_info.user.token])

    useEffect(()=>{
        if(inputRef.current["name"]){
            for(const [key,item] of Object.entries(inputRef.current)){
                if(item){
                    item.defaultValue = data[key]||"";
                }
            }
        }
    },[data])

    const deleteLocation = e=>{
        e.preventDefault();
        dispatch(delete_location_action(user_info.user.token,data.id));
        dispatch(get_locations_action(user_info.user.token))
    }
  return (
    <div className='single-location'>
        <div className="single-location-content">
            <input type="text" placeholder='Location / departement name' name='location' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}/>
            <input type="text" placeholder='name' name='name' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}/>
            <input type="text" placeholder='Address' name='address' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}/>
            <input type="text" placeholder='Portcode' name='postcode' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}/>
            <input type="text" placeholder='City' name='city' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}/>
            <input type="text" placeholder='Phone (optional)' name='phone' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}/>
            <textarea name="information" placeholder='information (optional)' cols="30" rows="5" ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}></textarea>
            {
                !nv&&(
                    <button className='delete-button' onClick={e=>deleteLocation(e)}>
                        Delete
                    </button>
                )
            }
        </div>
    </div>
  )
}
