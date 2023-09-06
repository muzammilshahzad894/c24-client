import React, { useEffect, useRef, useState } from 'react'
import "./availability.scss"
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {GrStatusGood} from 'react-icons/gr'
import {FaBackward, FaForward} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {add_availability_action, get_availability_action, remove_availability_action} from '../../state/Actions/UserAction';
import {DateTime} from 'react-datetime-bootstrap'
import { Link } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'


export default function Availability() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const get_personal = useSelector(state=>state.get_personal);
    useEffect(()=>{
        get_personal.user?.account_type==="client"&&window.location.replace("/dashboard")
    },[get_personal.user?.account_type])
    //month
    const [week, setWeek] = useState(true);
    const [monthIndex, setMonthIndex] = useState(date.getMonth())
    const [month, setMonth] = useState(months[monthIndex])
    const [year, setYear] = useState(date.getFullYear())
    const [numOfDays, setNumOfDays] = useState(new Date(monthIndex,year,0).getDate())
    const [currDay, setCurrDay] = useState(date.getDate()/*(date.getDate() - ((date.getDay() + 6) % 7))*/)

    //week
    const [nextWeek, setNextWeek] = useState(new Date())
    const [prevWeek, setPrevWeek] = useState(new Date())
    const [currWeek, setCurrWeek] = useState(new Date())
    const [daysOfWeek, setDaysOfWeek] = useState(new Date())
    console.log(currDay,currWeek);
    //other
    const user_info = useSelector(state=>state.user_info)
    const get_availability = useSelector(state=>state.get_availability)
    const add_availability = useSelector(state=>state.add_availability)

    const dispatch = useDispatch();
    const availableInputRef = useRef([])
    const checkboxRef = useRef([]);

    //ref for days of the months
    const monthDaysRef = useRef([])
    //recording all available days here
    let availableDays = get_availability.availability?get_availability.availability.map(item=>{
        if(item.availability_date.length){
            item.availability_date = {
            year_num: item.availability_date.split("/")[2],
            month_num : item.availability_date.split("/")[1],
            day_num : item.availability_date.split("/")[0]
            }

        }
        return item;
    }):[];
    //message handeling
    let message = {message:add_availability.availability_message};

    //redirection link 
    const linkRef = useRef();

    //checking available days input checkbox
    var checkbox_automatic_check  = function(){
        if(checkboxRef.current.length>0){
            checkboxRef.current.map(item=>{
                if(availableDays.map(elt=>elt.availability_date.day_num+"/"+elt.availability_date.month_num+"/"+elt.availability_date.year_num).includes(item.id)){
                    item.checked = true;
                }else{
                    item.checked = false;
                }
                return item;
            })
        }
    };
    //activating available days inputs
    var input_automatic_active = function(){
        if(availableInputRef.current.length>0){
            availableInputRef.current.map(item=>{
                if((availableDays.map(elt=>elt.availability_date.day_num+"/"+elt.availability_date.month_num+"/"+elt.availability_date.year_num).includes(item.id))||((item.props)&&(availableDays.map(elt=>elt.availability_date.day_num+"/"+elt.availability_date.month_num+"/"+elt.availability_date.year_num).includes(item.props.i_id)))){
                    if((availableDays.map(elt=>elt.availability_date).includes(item.id))){
                        item.disabled = false; 
                        item.className = "available"
                    }else{
                        item.dateTimePicker[0].disabled = false; 
                        item.dateTimePicker[0].className = "available";
                    }
                }else{
                    item.disabled = true;
                    item.className = "";
                    if(item.dateTimePicker){
                        item.dateTimePicker[0].disabled = true;
                        item.dateTimePicker[0].className = "";
                    }

                }
                return item;
            })            
        }
    };
    //activating available days of month
    var days_of_month_auto_activate = function(){
        if(monthDaysRef.current.length>0){
            monthDaysRef.current.map(item=>{
                if(availableDays.map(elt=>elt.availability_date.day_num+"/"+elt.availability_date.month_num+"/"+elt.availability_date.year_num).includes(item.id)){
                    item.classList.add("available")
                }else{
                    item.classList.remove("available")
                }
                return item;
            })
        }
    }
    //>>>>>>>>>>>>week functions<<<<<<<<<<<<<
    //recording all days that were available and won't be in the future
    let not_available_days = []
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    
    //getting availability dates
    useEffect(()=>{
        dispatch(get_availability_action(user_info.user.token))
    },[dispatch, user_info.user.token])

    useEffect(() => {
        checkbox_automatic_check();
        input_automatic_active();
        days_of_month_auto_activate();
        if(add_availability.availability_message&&add_availability.availability_message.length>0){
            setTimeout(()=>{
                add_availability.availability_message = null;
            },1000);
            linkRef.current.click();
        }
    });

    //adding available days to the database
    const handle_available_days = ()=>{
        dispatch(add_availability_action(availableDays,user_info.user.token))
        dispatch(remove_availability_action(not_available_days,user_info.user.token))
    }

    
    useEffect(()=>{        
        currWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7))
        nextWeek.setDate(currDay+7)
        prevWeek.setDate(currDay-7)
        setDaysOfWeek(new Date(currWeek))
        availableInputRef.current = [];
    },[])


    //to show the days of each week
    const changeDay = (index)=>{
        let variableOfDate = new Date(currWeek);
        variableOfDate.setDate(variableOfDate.getDate()+index);
        return variableOfDate.toLocaleString('en-GB')+","+variableOfDate.toLocaleString('en-GB', {weekday:'long'});
    }
    //to navigate through weeks
    const handleWeek = (input)=>{ 
        if(input === "prev"){
            nextWeek.setDate(nextWeek.getDate()-7)  
            currWeek.setDate(currWeek.getDate()-7);
            prevWeek.setDate(prevWeek.getDate()-7)
            setDaysOfWeek(new Date(currWeek))
        }else if(input === "next"){
            nextWeek.setDate(nextWeek.getDate()+7)  
            currWeek.setDate(currWeek.getDate()+7);
            prevWeek.setDate(prevWeek.getDate()+7)
            setDaysOfWeek(new Date(currWeek))
        }
    }
    
    //to record all available days of the week
    const handleAvailable = (e,av_date)=>{
        if(av_date==="repeat"){
            availableInputRef.current.map((item,key)=>{
                if(item.props && item.props.i_id==="repeat"){
                    availableInputRef.current[key].dateTimePicker[0].disabled = !e.target.checked;
                    availableInputRef.current[key].dateTimePicker[0].className = e.target.checked? availableInputRef.current[key].className+"available": availableInputRef.current[key].className.replace("available","");
                }
                return item;
            })
            return;
        }
        let date = av_date.day_num+"/"+av_date.month_num+"/"+av_date.year_num;
        if(e.target.checked){
            availableDays.push({
                availability_date:av_date,
                start_time:"00:00",
                end_time:"00:00",
            })
            not_available_days = not_available_days.filter(item=>item.unavailable_date!==date);

            availableInputRef.current.map((item,key)=>{
                if((item.props&&(item.props.i_id===date))||item.id===date){
                    if(item.id===date){
                        availableInputRef.current[key].disabled = false;
                        availableInputRef.current[key].className+=" available";
                    }else{
                        availableInputRef.current[key].dateTimePicker[0].disabled = false;
                        availableInputRef.current[key].dateTimePicker[0].className+=" available";
                    }
                }
                return true;
            })
        }if(!e.target.checked){
            
            availableDays = availableDays.filter(item=>item.availability_date.day_num+"/"+item.availability_date.month_num+"/"+item.availability_date.year_num!==date);
            not_available_days.push({
                unavailable_date:date
            })
            
            availableInputRef.current.map((item,key)=>{
                if((item.props&&(item.props.i_id===date))||item.id===date){
                    if(item.props.i_id===date){
                        availableInputRef.current[key].dateTimePicker[0].disabled = true;
                        availableInputRef.current[key].dateTimePicker[0].classList.remove("available");
                    }else{
                        availableInputRef.current[key].disabled = true;
                        availableInputRef.current[key].classList.remove("available")
                    }
                }
                return true;
            })
        }
    }
    //to set availability hours on a given day
    const handle_available_hours_of_day = (value,id,name)=>{
        value = (parseInt(value.split(":")[0])/*+1*/)+":"+value.split(":")[1]+":"+value.split(":")[2]
        availableDays = availableDays.map(item=>{
            if(item.availability_date.day_num+"/"+item.availability_date.month_num+"/"+item.availability_date.year_num===id){
                item[name] = value;
            }
            return item;
        })
    }
    //for repeat functionality
    const repeat = ()=>{
        let this_date = new Date(currWeek);
        let days_to_repeat = [];
        let repeating_days = [];
        let finish_date;
        let i=0;
        while(i<7){
            // eslint-disable-next-line no-loop-func
            // availableInputRef.current.map(item=>{
            //     if(this_date&&((this_date.toLocaleString().length>0)&& (item.props.i_id ===  this_date.toLocaleString("en-GB").split(",")[0]))){
            //         if(!item.dateTimePicker[0].disabled){
            //             console.log(item.dateTimePicker[0].value,item.dateTimePicker[0].valueAsDate,item);
            //             days_to_repeat.push({
            //                 day:this_date.toLocaleString('en-GB', {weekday:'long'}),
            //                 availability_date:{day_num:item.props.i_id.split("/")[0],month_num:item.props.i_id.split("/")[1],year_num:item.props.i_id.split("/")[2]},
            //                 [item.dateTimePicker[0].name]:item.dateTimePicker[0].valueAsDate||item.dateTimePicker[0].placeholder
            //             })
            //         }
            //     }
            //     return undefined;
            // })
            // eslint-disable-next-line no-loop-func
            availableDays.map(item=>{
                if(this_date.toLocaleString("en-GB").split(",")[0]===item.availability_date.day_num+"/"+item.availability_date.month_num+"/"+item.availability_date.year_num){
                    console.log(item,item.end_time,this_date.toLocaleString("en-GB"));
                    days_to_repeat.push({
                        day:this_date.toLocaleString("en-GB",{weekday:"long"}),
                        availability_date:item.availability_date,
                        start_time:item.start_time,
                        end_time:item.end_time,
                    })
                }
                return undefined;
            })
            this_date.setDate(this_date.getDate()+1);
            i++;
        }
        console.log(days_to_repeat)
        //initializing finish date
        finish_date = availableInputRef.current.filter(item=>item.props.i_id==="repeat")
        
        finish_date = new Date(finish_date[0].dateTimePicker[0].value.split("/")[2],parseInt(finish_date[0].dateTimePicker[0].value.split("/")[1])-1,finish_date[0].dateTimePicker[0].value.split("/")[0])
        
        //adding repeated dates
        console.log(days_to_repeat )
        while(this_date.getTime()<=new Date(finish_date).getTime()){
            days_to_repeat.map(item=>{
                if(this_date.toLocaleString('en-GB',{weekday:'long'}) === item.day){
                    console.log(item)
                 repeating_days.push({
                     availability_date:{day_num:this_date.toLocaleString("en-GB").split("/")[0],month_num:this_date.toLocaleString("en-GB").split("/")[1],year_num:this_date.toLocaleString("en-GB").split("/")[2].split(",")[0]},
                     start_time:item.start_time,
                     end_time:item.end_time
                 }) 
                }
                return [...repeating_days];
            })
            this_date.setDate(this_date.getDate()+1);
        }
        console.log(repeating_days)
        save_availability(repeating_days);
    }

   //>>>>>>>>>>>>>>>>>>>>month functions<<<<<<<<<<<<<<<<<<<<<<<<<<
    
   const goBackward = ()=>{
    if(monthIndex===0){
        setMonthIndex(11)
        setYear(year-1)
        setMonth(months[11])
        setNumOfDays(new Date(year,monthIndex,0).getDate())
    }else{
        setMonthIndex(monthIndex-1)
        setMonth(months[monthIndex-1])
        setNumOfDays(new Date(year,monthIndex,0).getDate())
    }
}
    const goForward = ()=>{
    if(monthIndex===11){
        setMonthIndex(0)
        setYear(year+1)
        setMonth(months[0])
        setNumOfDays(new Date(year,1,0).getDate())
    }else{
        setMonthIndex(monthIndex+1)
        setMonth(months[monthIndex+1])
        setNumOfDays(new Date(year,monthIndex+2,0).getDate())
    }
    } 

    let days_nums=[];
    for(let i = 1;i<=numOfDays;i++){
    days_nums.push(i);
    }
    //to record all available days of the month
    const handleAvailableDayOfMonth = (element,av_date)=>{
        if(availableDays.map(e=>e.availability_date.day_num+"/"+e.availability_date.month_num+"/"+e.availability_date.year_num).indexOf(element.id)===-1){
            availableDays.push({
                availability_date:av_date,
                start_time:"00:00",
                end_time:"00:00",
            })
            not_available_days = not_available_days.filter(item=>item.unavailable_date!==av_date.day_num+"/"+av_date.month_num+"/"+av_date.year_num);
            element.classList.add("available");
        
        }else{
            availableDays = availableDays.filter(item=>item.availability_date.day_num+"/"+item.availability_date.month_num+"/"+item.availability_date.year_num!==element.id);
            not_available_days.push({
                unavailable_date:element.id
            })
            element.classList.remove("available")
        }
        save_availability([])
    }


    //all available days
    const save_availability = (repeating_days)=>{
        availableDays = availableDays.concat(repeating_days);
        handle_available_days()
    }
    return (
        get_availability.loading?(
            <LoadingBox big/>
        ):(
        <div className='availability-div'>
            <DashboardBar/>
            <div className="availability-content">
                <div className="availability-title">
                    <h1>
                        Availability
                    </h1>
                </div>
                <div className="available-navigation">
                    <div className="month-week">
                        <button className={`week ${week?"selected":""}`} onClick={()=>setWeek(true)}>For week</button>
                        <button className={`month-switch ${week?"":"selected"}`} onClick={()=>setWeek(false)}>Per month</button>
                    </div>
                    {
                        week&&(
                        <div className="weeks">
                            <IoIosArrowBack className='week-arrow' onClick={()=>handleWeek("prev")}/>
                            <div className="nav-week" onClick={()=>handleWeek("prev")}>
                                <span>{(prevWeek.getDate().toString().length===1?("0"+prevWeek.getDate()):prevWeek.getDate())+"-"+((prevWeek.getMonth()+1).toString().length===1?"0"+(prevWeek.getMonth()+1):(prevWeek.getMonth()+1))+"-"+prevWeek.getFullYear()}</span>
                            </div>
                            <div className="nav-week middle">
                                <span>{currWeek.getDate().toString().length===1?"0"+currWeek.getDate():currWeek.getDate()}-{(currWeek.getMonth()+1).toString().length===1?"0"+(currWeek.getMonth()+1):(currWeek.getMonth()+1)}-{currWeek.getFullYear()}</span>
                            </div>
                            <div className="nav-week"onClick={()=>handleWeek("next")}> 
                                <span>{(nextWeek.getDate().toString().length===1?"0"+nextWeek.getDate():nextWeek.getDate())+"-"+((nextWeek.getMonth()+1).toString().length===1?"0"+(nextWeek.getMonth()+1):(nextWeek.getMonth()+1))+"-"+nextWeek.getFullYear()}</span>
                            </div>
                            <IoIosArrowForward className='week-arrow' onClick={()=>handleWeek("next")}/>
                        </div>
                        )
                    }
                </div>
                {
                    week?(
                    <div className="days">
                        {days.map((item,index)=>{
                            let date = changeDay(index);
                            //taking off the un-necesarry data
                            date = date.replaceAll("/","-");
                            date = date.replace(" PM","");
                            date = date.replace("AM","");
                            
                            //pulling off each attribute and configuring it
                            let numOfDay = date.split(" ")[0].split("-")[0];

                            let month = date.split(" ")[0].split("-")[1];

                            let nameOfDay = date.split(" ")[1].split(",")[1];

                            numOfDay = (numOfDay.length===1?"0":"")+numOfDay;

                            month = (month.length===1?"0":"")+month;

                            let year = date.split(" ")[0].split("-")[2].replace(",","");
                            

                            //condition to see if the date is already mentioned as available
                            let condition = availableDays[availableDays.map((item,index)=>item.availability_date.day_num+"/"+item.availability_date.month_num+"/"+item.availability_date.year_num===(numOfDay+"/"+month+"/"+year)?index:false).filter(item=>item!==false)[0]]
                            let start_time = condition!==undefined ? (condition.start_time):"";
                            let end_time = condition!==undefined ? (condition.end_time):"";

                            return(
                            <div className="element" key={index}> 
                                <div className="day">   
                                    <h1>{nameOfDay}</h1>
                                    <span>{numOfDay}-{month}-{year}</span>
                                </div>
                                <div className="start-end">
                                    <div className="element-input">
                                        {index===0 &&<h1>Start Time</h1>}
                                        <DateTime pickerOptions={{format:"LT"}} name="start_time" disabled placeholder={start_time}  onChange={(e)=>handle_available_hours_of_day(e.split("T")[1].split(" ")[0].split(".")[0],`${numOfDay}/${month}/${year}`,"start_time")} i_id={numOfDay+"/"+month+"/"+year}  ref={ref=>ref!==null&&availableInputRef.current.push(ref)}/>
                                    </div>
                                    <div className="element-input">
                                        {index===0 &&<h1>End Time</h1>}
                                        <DateTime pickerOptions={{format:"LT"}} name="end_time" disabled placeholder={end_time}  onChange={(e)=>handle_available_hours_of_day(e.split("T")[1].split(" ")[0].split(".")[0],`${numOfDay}/${month}/${year}`,"end_time")} i_id={numOfDay+"/"+month+"/"+year}  ref={ref=>ref!==null&&availableInputRef.current.push(ref)}/>
                                    </div>
                                </div>
                                <div className="available-checkbox">
                                    <input type="checkbox" name="available" id={numOfDay+"/"+month+"/"+year} ref={ref=>ref!==null&&(checkboxRef.current.push(ref))}  onChange={(e)=>handleAvailable(e,{year_num:year,month_num:month,day_num:numOfDay})}/>
                                    <span>Available</span>
                                </div>
                            </div>
                        )})}
                         <div className="to-repeat">
                            <div className="to-repeat-top-text">
                                <p>
                                    Leave start and end time blank if you are available all day
                                </p>
                            </div>
                            <div className="to-repeat-input-checkbox">
                                <div className="to-repeat-checkbox">
                                    <input type="checkbox" name="to-repeat"  onChange={(e)=>handleAvailable(e,"repeat")}/>
                                    <span>To repeat</span>
                                </div>
                                <div className="to-repeat-input">
                                    {<DateTime i_id='repeat'placeholder="DD/MM/YYYY" disabled ref={ref=>ref!==null&&availableInputRef.current.push(ref)} pickerOptions={{format:"DD/MM/YYYY"}} />}
                                </div>
                            </div>
                            <div className="to-repeat-bottom-text">
                                <span>
                                    Use this daily availability for a longer period of time
                                </span>
                            </div> 
                        </div>
                        <Link to="/dashboard/settings" 
                        state={message}
                        ref = {ref=>ref!==null&&(linkRef.current = ref)}
                        >
                        </Link>
                        <div className="save" onClick={()=>repeat()}>
                            <Link to="/dashboard/settings">
                                <button className="back" >Back</button>
                            </Link>
                            <button>Save</button>
                        </div>
                    </div>
                    ):(
                    <div className='month'>
                        <div className="month-navigation">
                            <div className="go-back"><FaBackward onClick={()=>goBackward()}/></div>
                            <div className="month-year">{month} {year}</div>
                            <div className="go-next"><FaForward onClick={()=>goForward()}/></div>
                        </div>
                        {
                            days.map((item,index)=>(
                                <div className='month-day' key={index}>
                                    {item.slice(0,3)}
                                </div>
                            ))
                        }
                        {days_nums.map((item,index)=>{
                            let date = new Date(year,months.indexOf(month),item).toLocaleString('en-GB');
                            date = date.split(",")[0];
                            let day_num = (date.split("/")[1]&&date.split("/")[1].length===1?"0":"")+date.split("/")[0];
                            let month_num = (date.split("/")[0]&&date.split("/")[0].length===1?"0":"")+date.split("/")[1];
                            let year_num = (date.split("/")[2]&&date.split("/")[2].length===1?"0":"")+date.split("/")[2];

                            return (
                            <div key={index} className={`month-day-number`} id={`${day_num+"/"+month_num+"/"+year_num}`} ref={ref=>ref!==null&&(monthDaysRef.current.push(ref))}  onClick={(e)=>handleAvailableDayOfMonth(e.target,{year_num,month_num,day_num})}>    
                                <p>
                                    {item}
                                </p>

                                <GrStatusGood className='month-day-number-icon-selected'/>
                                <AiFillCloseCircle className='month-day-number-icon-not-selected'/>
                            </div>
                            )
                        })}
                   </div>
                    )
                }

            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
