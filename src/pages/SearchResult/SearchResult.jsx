import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import "./searchResult.scss";
import {IoPricetag} from 'react-icons/io5'
import { BsClock } from 'react-icons/bs';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom';
import {TbLayoutList,TbLayoutGrid} from 'react-icons/tb';
import SingleResult from '../../components/SingleResult/SingleResult';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { get_all_competencies_action, get_liked_action, search_action } from '../../state/Actions/UserAction';
import SearchResultHeader from '../../components/SearchResultHeader/SearchResultHeader';
import Footer from '../../components/Footer/Footer';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

export default function SearchResult() {
  const [layout, setLayout] = useState(false);
  const [showHours, setShowHours] = useState(false)
  const [showFields, setShowFields] = useState(false)
  const [showTypeAssignment, setShowTypeAssignment] = useState(false)
  const [showEstimated, setShowEstimated] = useState(false)
  const [childcare, setChildcare] = useState(false)
  const [showChildcareComp, setShowChildcareComp] = useState(false)
  const location = useLocation();
  const user_info = useSelector(state=>state.user_info);
  const research = useSelector(state=>state.research);
  const get_all_comp = useSelector(state=>state.get_all_competencies)
  const [freelancer,setFreelancer] = useState((location.state?.table === "users"));
  const [eltsIndex, setEltsIndex] = useState(10)
  const [elts, setElts] = useState([])
  const [alter, setalter] = useState(false)
  const dispatch = useDispatch()  
  //slider elt
  var slider = useRef();
  //data object to store search values
  const searchData =     
  {
    freelancer:{
      hourly_rate:{
        operation:"",
        values:""
      },
      user_name:{
        operation:"",
        values:""
      },
      profession:{
        operation:"",
        values:""
      },
      city:{
        operation:"",
        values:""
      },
      postcode:{
        operation:"",
        values:""
      },
      diplomat_certificate:{
        operation:"",
        values:""
      },
      radius:{
        operation:"",
        values:0
      },
      currency:{
        operation:"like ",
        values:"EUR"
      },
      competency:{
        operation:"",
        values:""
      },
    },
    assignment:{
      job_name:{
        operation:"",
        values:""
      },
      industry:{
        operation:"",
        values:""
      },
      country:{
      operation:"",
      values:""
      },
      province:{
        operation:"",
        values:""
      },
      working_hours : {
        operation:"",
        values:[]
      },
      job_duration:{
        operation:"",
        values:[]
      },
      pay_type:{
        operation:"",
        values:[]
      },
      radius:{
        operation:"",
        values:0
      
      },
    },
    table : freelancer?"users":"assignements"

  }    
  const data = useRef((sessionStorage.getItem("searchData")?JSON.parse(sessionStorage.getItem("searchData")):searchData));
  const [hourlyRate, setHourlyRate] = useState(data.current?.freelancer?.hourly_rate?.values||50)

  //redirection link for users who are not logged in yet
  const linkRef = useRef();

  //set data to location value if ther's no
  //save search object once changed 
  useEffect(()=>{
    if(location.state?.freelancer?.currency  ){
      //data.current = location.state;
    }
    sessionStorage.setItem("searchData",JSON.stringify(data.current))
  },[])

  //initialize data once loaded
  useEffect(()=>{
    if(data.current){
      data.current.table = freelancer?"users":"assignements"
      if(data.current?.hourly_rate){
        data.current = searchData;
      }
      //location.state = data.current;
    }
    sessionStorage.setItem("searchData",JSON.stringify(data.current))
  },[freelancer, location, searchData])
  /*useEffect(()=>{
    if(data.current?.user_name){
      if(!freelancer){

        data.current.user_name.values = "";
        data.current.hourly_rate.values = "";
        data.current.profession.values = "";
        data.current.city.values = "";
        data.current.postcode.values = "";
        data.current.diplomat_certificate.values = "";
        data.current.radius.values = "";
        data.current.currency.values = "";
        data.current.competency.values = "";

      }else{

        data.current.job_name.values = "";
        data.current.working_hours.values = [];
        data.current.industry.values = "";
        data.current.country.values = "";
        data.current.province.values = "";
        data.current.job_duration.values = [];
        data.current.pay_type.values = [];
        data.current.currency.values = "";
        setHourlyRate(50)
        

      }
      
      sessionStorage.setItem("searchData",JSON.stringify(data.current))
    }
    
  },[freelancer])
  */
  //set freelancer to the corresponding value when already made search
  useEffect(()=>{
    console.log("location")
    setFreelancer(
      (research.data?.at(0)?.email?.length>0)
      ||
      (location.state?.user_id>0)
      ||
      (location.state?.table === "users")
    )
    window.scrollTo(0,0)
  },[])

   

  useEffect(()=>{
    /*if(!user_info.user?.token){
      linkRef.current?.click();
    }*/
    dispatch(get_all_competencies_action())
  },[dispatch, user_info.user?.token])

  useEffect(()=>{
    if(research.data?.at(0)){
      setalter(false);
    }
  },[research])

  useEffect(()=>{
    dispatch(get_liked_action(freelancer?"freelancers":"assignements",user_info.user.token))
  },[dispatch, freelancer, user_info])

  useEffect(()=>{
    if(data.current.freelancer?.currency?.values && document.getElementById("hourly_wage")){
      let value = data.current.freelancer?.currency?.values;
      if(value.length>0){
        document.getElementById("hourly_wage").innerText = `
          Hourly wage ${hourlyRate} ${value}
        `;
      }else{
        //€
        document.getElementById("hourly_wage").innerText = `
        Hourly wage ${hourlyRate} €
      `;
      }
    }
  },[hourlyRate])


  //trigger search event once hourly wage has changed
    useEffect(()=>{
      console.log("houly rate search")
      if(freelancer){
        searchHandler(false,"hourly_rate","<=",hourlyRate)
      }
   },[hourlyRate,freelancer])


   //search function
  const searchHandler = (remove,key,op,value)=>{  
    let info = {},searchInfo = freelancer?data.current.freelancer:data.current.assignment;
    //modifying the hourly_wage element with the new currency in case of currency change
    if(key==="currency" && document.getElementById("hourly_wage")){
      if(value.length>0){
        document.getElementById("hourly_wage").innerText = `
          Hourly wage ${hourlyRate} ${value}
        `;
      }else{
        //€
        document.getElementById("hourly_wage").innerText = `
        Hourly wage ${hourlyRate} €
      `;
      }
    }
    //asserting new data to data obj
    if(searchInfo && searchInfo[key]){ 
        //removing an element from the search
        if(remove){
            searchInfo[key].values = searchInfo[key]?.values.filter(item=>item!==value);
        }else{
            if(typeof(searchInfo[key].values)!=="string" && typeof(searchInfo[key].values)!=="number"){

                if(typeof(value)!=="string"){
                  searchInfo[key].values = [...searchInfo[key].values,...value]

                }else{
                  searchInfo[key]?.values.push(value)
                }
                searchInfo[key].values = [...new Set(searchInfo[key].values)]
            }else{
              searchInfo[key].values = value
            }
        }
        searchInfo[key].operation = op
        for(const [the_key,elt] of Object.entries(searchInfo)){
            if(elt.values?.toString()?.length>0 && the_key !=="radius"){
                info[the_key] = elt;
            }
        }
        if(freelancer){
          data.current.freelancer = searchInfo;
        }else{
          data.current.assignment = searchInfo;   
        }
        if(data.current){
          //data.current =  JSON.parse(sessionStorage.getItem("searchData"));
          data.current.table = freelancer?"users":"assignements";
          sessionStorage.setItem("searchData",JSON.stringify(data.current))
          location.state = data.current;
        }
        info.table = freelancer?"users":"assignements";
        dispatch(search_action(info))

    }
  }


  useEffect(()=>{
    setElts(research.data?.slice(0,10));
    setEltsIndex(10);
  },[research])

  const showMoreItems = ()=>{
    setElts(research.data?.slice(0,eltsIndex+10));
    setEltsIndex(eltsIndex+10);
  }

  const compHandler = e=>{
      searchHandler(false,"competency","=",e.target.value)
  }

  const industryHandler = e=>{
    document.getElementById("all_fields_search_header").value = e.target.value;
    if(e.target.value==="Childcare"){
      setChildcare(true);
    }else{
      setChildcare(false);
      searchHandler(false,!freelancer?"industry":"competency","=",e.target.value)
    }
  }
  const clearFilters = ()=>{
    sessionStorage.setItem("freelancer",location.state?.table==="users");
    //sessionStorage.removeItem("searchData");
    //setting hourly rate variable 
    if(document?.getElementById("myRange")){
      document.getElementById("myRange").value = 50;
    }
    //setting hourly rate input 
    if(document.getElementById("hourly_wage")){
      document.getElementById("hourly_wage").innerText = `
      Hourly wage ${50} €
    `;
    }
    data.current = searchData
    data.current.table = freelancer?"users":"assignements";
    sessionStorage.setItem("searchData",JSON.stringify(searchData))
    setHourlyRate(50)

    
    /*searchHandler(false,
      (!freelancer?"job_name":"profession")
      ,"like "
      ,(freelancer?data.current?.assignment?.job_name?.values:data.current?.freelancer?.profession?.values)
      )*/
    //setElts([])
    //window.location.reload()
  }

  
    //change input handler 
    function increaseValue() {
      if(slider){
          slider.current.stepUp();
          setHourlyRate(slider.current.value);
      }
  }

    function decreaseValue() {
      if(slider){
          slider.current.stepDown();
          setHourlyRate(slider.current.value);

      }
  }
  console.log(freelancer)
  return (
    <div className='search_results_container'>
      <Header Child={<SearchResultHeader changeData={(newData)=>data.current=newData}  data={data.current} changeType={(fr)=>{setFreelancer(fr)}} freelancerBool={freelancer} switchSearch={freelancer}/>}/>
      <div className="search_results" style={{backgroundColor:research.data?.length===0&&"#f1f1f1"}}>
            <div className="search_results_filter">
              <div className="search_results_filter_inputs">
                <div>
                  <p>
                    {research.data?.length>10?("Search results 1 - "+ eltsIndex+" of "+(research.data?.length-1)):research.data?.length>0?("Search results "+(research.data?.length-1)):("No results")}
                  </p>
                </div>
                <div style={{height:"106px"}}>
                  <div style={{borderRight:"1px #555 solid"}}>
                    <div onClick={()=>setShowFields(!showFields)}>
                      <IoPricetag/>
                      <select name="All fields" id="all_fields" onChange={e=>industryHandler(e)}>
                        <option value="">All fields</option>
                        <option value="Construction" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Construction"):data.current?.assignment?.industry?.values.includes("Construction")}>
                          Construction
                        </option>
                        <option  value="Electrical" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Electrical"):data.current?.assignment?.industry?.values.includes("Electrical")}>
                          Electrical
                        </option>
                        <option value="Installation" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Installation"):data.current?.assignment?.industry?.values.includes("Installation")}>
                          Installation
                        </option>
                        <option value="Infrastructure" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Infrastructure"):data.current?.assignment?.industry?.values.includes("Infrastructure")}>
                          Infrastructure
                        </option>
                        <option   value="Industrial" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Industrial"):data.current?.assignment?.industry?.values.includes("Industrial")}>
                          Industrial
                        </option>
                        <option value="Health care and well being" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Health care and well being"):data.current?.assignment?.industry?.values.includes("Health care and well being")}>
                            Health care and well being
                        </option>
                        <option  value="Trade and services" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Trade and services"):data.current?.assignment?.industry?.values.includes("Trade and services")}>
                            Trade and services
                        </option>
                        <option value="IT" selected={freelancer?data.current?.freelancer?.competency?.values.includes("IT"):data.current?.assignment?.industry?.values.includes("IT")}>
                            IT
                        </option>
                        <option  value="Justice, security and public administration" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Justice, security and public administration"):data.current?.assignment?.industry?.values.includes("Justice, security and public administration")}>
                            Justice, security and public administration
                        </option>
                        <option value="Environment and Agriculture" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Environment and Agriculture"):data.current?.assignment?.industry?.values.includes("Environment and Agriculture")}>
                            Environment and Agriculture
                        </option>
                        <option value="Media and communication" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Media and communication"):data.current?.assignment?.industry?.values.includes("Media and communication")}>
                            Media and communication
                        </option>
                        <option value="Education, culture and science" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Education, culture and science"):data.current?.assignment?.industry?.values.includes("Education, culture and science")}>
                            Education, culture and science
                        </option>
                        <option  value="Engineering, production and construction" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Engineering, production and construction"):data.current?.assignment?.industry?.values.includes("Engineering, production and construction")}>
                            Engineering, production and construction
                        </option>
                        <option  value="Tourism, recreation and catering" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Tourism, recreation and catering"):data.current?.assignment?.industry?.values.includes("Tourism, recreation and catering")}>
                            Tourism, recreation and catering
                        </option>
                        <option value="Transport and Logistics" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Transport and Logistics"):data.current?.assignment?.industry?.values.includes("Transport and Logistics")}>
                            Transport and Logistics
                        </option>
                        <option value="Childcare" selected={freelancer?data.current?.freelancer?.competency?.values.includes("Childcare"):data.current?.assignment?.industry?.values.includes("Childcare")}>
                            Childcare
                        </option>
                      </select>
                    </div>
                  </div>
                  {
                    childcare&&freelancer&&(
                      <>
                        <div style={{borderRight:"1px #555 solid"}}>
                          <div>
                            <select name="All Childcare Comp" id="" style={{width:"130px"}} onChange={e=>compHandler(e)}>
                              <option value="">All Competencies</option>
                              {
                                get_all_comp?.competencies?.map((item,idx)=>(
                                  <option value={item.id} key={idx}>
                                    {item?.competence}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div style={{borderRight:"1px #555 solid"}}>
                          <div onClick={()=>setShowChildcareComp(!showChildcareComp)}>
                            <select onChange={e=>searchHandler(false,"diplomat_certificate","=",e.target.value)} style={{width:"190px"}}> 
                              <option value="">
                                  Diplomas and Certificates
                              </option>

                              <option value="Aanvullend bewijs regeling 1 feb 2021 BSO" >
                                  Aanvullend bewijs regeling 1 feb 2021 BSO
                              </option>

                              <option value="Aanvullend bewijs regeling 1 feb 2021 KDV" >
                                  Aanvullend bewijs regeling 1 feb 2021 KDV
                              </option>

                              <option value="Aggressie (Certificaat)" >
                                  Aggressie (Certificaat)
                              </option>

                              <option value="Baby (Certificaat)" >
                                  Baby (Certificaat)
                              </option>

                              <option value="Bewijs Zakelijke Verzekering" >
                                  Bewijs Zakelijke Verzekering
                              </option>

                              <option value="BHV (Certificaat)" >
                                  BHV (Certificaat)
                              </option>

                              <option value="Certificaat Meldcode" >
                                  Certificaat Meldcode
                              </option>

                              <option value="Certificaat overig" >
                                  Certificaat overig
                              </option>

                              <option value="Certificaten (Overig)" >
                                  Certificaten (Overig)
                              </option>

                              <option value="Coaching Certificaat" >
                                  Coaching Certificaat
                              </option>

                              <option value="Cursus management Kinderopvang" >
                                  Cursus management Kinderopvang
                              </option>

                              <option value="Diplomawaardering" >
                                  Diplomawaardering
                              </option>

                              <option value="Diplomawaardering - pedagogisch werk" >
                                  Diplomawaardering - pedagogisch werk
                              </option>

                              <option value="EHBO (Certificaat)" >
                                  EHBO (Certificaat)
                              </option>

                              <option value="HBO - 50% toelatingseis BSO" >
                                  HBO - 50% toelatingseis BSO
                              </option>

                              <option value="HBO - 75% toelatingseis" >
                                  HBO - 75% toelatingseis
                              </option>

                              <option value="HBO - Akte lager onderwijs zonder hoofdakte (oude kweekschool)" >
                                  HBO - Akte lager onderwijs zonder hoofdakte (oude kweekschool)
                              </option>

                              <option value="HBO - Akte van bekwaamheid als (hoofd-)leidster bij het kleuteronderwijs" >
                                  HBO - Akte van bekwaamheid als (hoofd-)leidster bij het kleuteronderwijs
                              </option>

                              <option value="HBO - Akte van bekwaamheid als (hoofd-)onderwijzer" >
                                  HBO - Akte van bekwaamheid als (hoofd-)onderwijzer
                              </option>

                              <option value="HBO - Akte van bekwaamheid als volledig bevoegd onderwijzer" >
                                  HBO - Akte van bekwaamheid als volledig bevoegd onderwijzer
                              </option>

                              <option value="HBO - Aktiviteitenleidersopleiding" >
                                  HBO - Aktiviteitenleidersopleiding
                              </option>

                              <option value="HBO - Applicatiecursus leraar basisonderwijs (i.c.m. kleuterakte A/B)" >
                                  HBO - Applicatiecursus leraar basisonderwijs (i.c.m. kleuterakte A/B)
                              </option>

                              <option value="HBO - Beeldende kunst en vormgeving" >
                                  HBO - Beeldende kunst en vormgeving
                              </option>

                              <option value="HBO - CIOS algemeen sportleider (HBO)" >
                                  HBO - CIOS algemeen sportleider (HBO)
                              </option>

                              <option value="HBO - Creatieve therapie" >
                                  HBO - Creatieve therapie
                              </option>

                              <option value="HBO - Cultureel Werk" >
                                  HBO - Cultureel Werk
                              </option>

                              <option value="HBO - Culturele en Maatschappelijke Vorming (CMV)" >
                                  HBO - Culturele en Maatschappelijke Vorming (CMV)
                              </option>

                              <option value="HBO - Docent Dans" >
                                  HBO - Docent Dans
                              </option>

                              <option value="HBO - Docent Drama" >
                                  HBO - Docent Drama
                              </option>

                              <option value="HBO - Educatieve Therapie" >
                                  HBO - Educatieve Therapie
                              </option>

                              <option value="HBO - Extramurale Gezondheidszorg (EMGZ)" >
                                  HBO - Extramurale Gezondheidszorg (EMGZ)
                              </option>

                              <option value="HBO - Hogere Sociaal-Pedagogische opleiding leidster jeugdvorming" >
                                  HBO - Hogere Sociaal-Pedagogische opleiding leidster jeugdvorming
                              </option>

                              <option value="HBO - Inrichtingswerks (IW)" >
                                  HBO - Inrichtingswerks (IW)
                              </option>

                              <option value="Hbo - Islamitische Theologie" >
                                  Hbo - Islamitische Theologie
                              </option>

                              <option value="Hbo - Islamitische Theologie (Propedeuse)" >
                                  Hbo - Islamitische Theologie (Propedeuse)
                              </option>

                              <option value="HBO - Jeugdwelzijnswerk" >
                                  HBO - Jeugdwelzijnswerk
                              </option>

                              <option value="HBO - Kinderopvang (Associate Degree)" >
                                  HBO - Kinderopvang (Associate Degree)
                              </option>

                              <option value="HBO - Kinderverzorging en Opvoeding" >
                                  HBO - Kinderverzorging en Opvoeding
                              </option>

                              <option value="HBO - Kreatief Edukatief Werk" >
                                  HBO - Kreatief Edukatief Werk
                              </option>

                              <option value="HBO - Kunstzinnige therapie" >
                                  HBO - Kunstzinnige therapie
                              </option>

                              <option value="HBO - Kunstzinnig vormende opleiding (HBO, docenten richting)" >
                                  HBO - Kunstzinnig vormende opleiding (HBO, docenten richting)
                              </option>

                              <option value="HBO - Leraar Basisonderwijs (HBO, PABO)" >
                                  HBO - Leraar Basisonderwijs (HBO, PABO)
                              </option>

                              <option value="HBO - Leraar lichamelijke oefening (ALO)" >
                                  HBO - Leraar lichamelijke oefening (ALO)
                              </option>

                              <option value="Hbo - Leraar Speciaal onderwijs" >
                                  Hbo - Leraar Speciaal onderwijs
                              </option>

                              <option value="HBO - Lerarenopleiding (Andere vakken)" >
                                  HBO - Lerarenopleiding (Andere vakken)
                              </option>

                              <option value="HBO - Lerarenopleiding Omgangskunde" >
                                  HBO - Lerarenopleiding Omgangskunde
                              </option>

                              <option value="HBO - Lerarenopleiding Pedagogiek" >
                                  HBO - Lerarenopleiding Pedagogiek
                              </option>

                              <option value="HBO - Lerarenopleiding Verzorging/Gezondheidskunde" >
                                  HBO - Lerarenopleiding Verzorging/Gezondheidskunde
                              </option>

                              <option value="HBO - Lerarenopleiding Verzorging/Huishoudkunde" >
                                  HBO - Lerarenopleiding Verzorging/Huishoudkunde
                              </option>

                              <option value="HBO - Maatschappelijk Werk" >
                                  HBO - Maatschappelijk Werk
                              </option>

                              <option value="HBO - Maatschappelijk Werk en Dienstverlening" >
                                  HBO - Maatschappelijk Werk en Dienstverlening
                              </option>

                              <option value="HBO - Maatschappelijk Zorg" >
                                  HBO - Maatschappelijk Zorg
                              </option>

                              <option value="HBO - Onderwijsondersteuner Omgangskunde (Associate Degree)" >
                                  HBO - Onderwijsondersteuner Omgangskunde (Associate Degree)
                              </option>

                              <option value="HBO - Overig" >
                                  HBO - Overig
                              </option>

                              <option value="HBO - Pedagogiek (HBO Bachelor)" >
                                  HBO - Pedagogiek (HBO Bachelor)
                              </option>

                              <option value="HBO - Pedagogiek MO-A of kandidaatsexamen" >
                                  HBO - Pedagogiek MO-A of kandidaatsexamen
                              </option>

                              <option value="HBO - Pedagogische Academie" >
                                  HBO - Pedagogische Academie
                              </option>

                              <option value="HBO - Pedagogisch Educatief Medewerker" >
                                  HBO - Pedagogisch Educatief Medewerker
                              </option>

                              <option value="HBO - Pedagogisch Educatief Professional" >
                                  HBO - Pedagogisch Educatief Professional
                              </option>

                              <option value="HBO - Pedagogisch management Kinderopvang" >
                                  HBO - Pedagogisch management Kinderopvang
                              </option>

                              <option value="HBO - Propedeuse (Algemeen)" >
                                  HBO - Propedeuse (Algemeen)
                              </option>

                              <option value="HBO - Psychologie" >
                                  HBO - Psychologie
                              </option>

                              <option value="HBO - Psychologie specialisatie kinderen/onderwijs" >
                                  HBO - Psychologie specialisatie kinderen/onderwijs
                              </option>

                              <option value="HBO - Psychomotorische Therapie en Bewegingsagogie" >
                                  HBO - Psychomotorische Therapie en Bewegingsagogie
                              </option>

                              <option value="HBO - Sociaal kunstzinnige therapie" >
                                  HBO - Sociaal kunstzinnige therapie
                              </option>

                              <option value="HBO - Sociaal Pedagogische Hulpverlening" >
                                  HBO - Sociaal Pedagogische Hulpverlening
                              </option>

                              <option value="HBO - Social Work (Bachelor)" >
                                  HBO - Social Work (Bachelor)
                              </option>

                              <option value="HBO - Toegepaste Psychologie" >
                                  HBO - Toegepaste Psychologie
                              </option>

                              <option value="HBO - Verpleegkunde" >
                                  HBO - Verpleegkunde
                              </option>

                              <option value="HBO - Verzorging" >
                                  HBO - Verzorging
                              </option>

                              <option value="HBO - Z-Verpleegkundige" >
                                  HBO - Z-Verpleegkundige
                              </option>

                              <option value="Hechtingsproblemen (Certificaat)" >
                                  Hechtingsproblemen (Certificaat)
                              </option>

                              <option value="Inschrijving Personenregister" >
                                  Inschrijving Personenregister
                              </option>

                              <option value="Kvk-uittreksel" >
                                  Kvk-uittreksel
                              </option>

                              <option value="mailconversatie ZZP ORG" >
                                  mailconversatie ZZP ORG
                              </option>

                              <option value="Mail in FCB" >
                                  Mail in FCB
                              </option>

                              <option value="MBO - Activiteitenbegeleiding" >
                                  MBO - Activiteitenbegeleiding
                              </option>

                              <option value="Mbo - Agogisch medewerker GGZ" >
                                  Mbo - Agogisch medewerker GGZ
                              </option>

                              <option value="MBO - Agogisch Werk" >
                                  MBO - Agogisch Werk
                              </option>

                              <option value="MBO - Akte Hoofdleidster Kleuteronderwijs" >
                                  MBO - Akte Hoofdleidster Kleuteronderwijs
                              </option>

                              <option value="MBO - Akte Kleuterleidster A" >
                                  MBO - Akte Kleuterleidster A
                              </option>

                              <option value="MBO - Akte Kleuterleidster B" >
                                  MBO - Akte Kleuterleidster B
                              </option>

                              <option value="MBO - Apothekersassistent" >
                                  MBO - Apothekersassistent
                              </option>

                              <option value="MBO - Arbeidstherapie (AB)" >
                                  MBO - Arbeidstherapie (AB)
                              </option>

                              <option value="MBO - A-Verpleegkundige" >
                                  MBO - A-Verpleegkundige
                              </option>

                              <option value="MBO - Brancheopleiding Ervaren Peuterspeelzaalleidster (BEP)" >
                                  MBO - Brancheopleiding Ervaren Peuterspeelzaalleidster (BEP)
                              </option>

                              <option value="MBO - Brancheopleiding Leidster Kinderopvang" >
                                  MBO - Brancheopleiding Leidster Kinderopvang
                              </option>

                              <option value="MBO - B-Verpleegkundige" >
                                  MBO - B-Verpleegkundige
                              </option>

                              <option value="MBO - Cultureel Werk (CW)" >
                                  MBO - Cultureel Werk (CW)
                              </option>

                              <option value="MBO - Doktersassistent" >
                                  MBO - Doktersassistent
                              </option>

                              <option value="MBO - Extramurale Gezondheidszorg (EMGZ)" >
                                  MBO - Extramurale Gezondheidszorg (EMGZ)
                              </option>

                              <option value="MBO - Gespecialiseerd Pedagogisch Werker 4" >
                                  MBO - Gespecialiseerd Pedagogisch Werker 4
                              </option>

                              <option value="MBO - Helpende Zorg en Welzijn" >
                                  MBO - Helpende Zorg en Welzijn
                              </option>

                              <option value="MBO - Inrichtingswerk Gezondheidszorg" >
                                  MBO - Inrichtingswerk Gezondheidszorg
                              </option>

                              <option value="Mbo - Instructeur mbo" >
                                  Mbo - Instructeur mbo
                              </option>

                              <option value="MBO - Kinderbescherming A" >
                                  MBO - Kinderbescherming A
                              </option>

                              <option value="MBO - Kinderbescherming B" >
                                  MBO - Kinderbescherming B
                              </option>

                              <option value="MBO - Kinderverzorging en Opvoeding" >
                                  MBO - Kinderverzorging en Opvoeding
                              </option>

                              <option value="MBO - Kinderverzorging/Jeugdverzorging (KV/JV)" >
                                  MBO - Kinderverzorging/Jeugdverzorging (KV/JV)
                              </option>

                              <option value="MBO - Kinderverzorgster (KV)" >
                                  MBO - Kinderverzorgster (KV)
                              </option>

                              <option value="MBO - Kinderverzorgster van de centrale raad voor de kinderuitzending" >
                                  MBO - Kinderverzorgster van de centrale raad voor de kinderuitzending
                              </option>

                              <option value="MBO - Kleuterzorg" >
                                  MBO - Kleuterzorg
                              </option>

                              <option value="MBO - Kultureel Werk (KW)" >
                                  MBO - Kultureel Werk (KW)
                              </option>

                              <option value="MBO - Leidster Kindercentra (LKC)" >
                                  MBO - Leidster Kindercentra (LKC)
                              </option>

                              <option value="Mbo - Leisure &amp; hospitality executive" >
                                  Mbo - Leisure &amp; hospitality executive
                              </option>

                              <option value="Mbo - Maatschappelijke zorg" >
                                  Mbo - Maatschappelijke zorg
                              </option>

                              <option value="MBO - MDGO VZ" >
                                  MBO - MDGO VZ
                              </option>

                              <option value="MBO - Onderwijs Assistent" >
                                  MBO - Onderwijs Assistent
                              </option>

                              <option value="MBO - Onderwijs Assistent (Primair/Speciaal Onderwijs)" >
                                  MBO - Onderwijs Assistent (Primair/Speciaal Onderwijs)
                              </option>

                              <option value="Mbo - Overig" >
                                  Mbo - Overig
                              </option>

                              <option value="MBO - Pedagogisch Werker 3" >
                                  MBO - Pedagogisch Werker 3
                              </option>

                              <option value="MBO - Pedagogisch Werker 3 Kinderopvang" >
                                  MBO - Pedagogisch Werker 3 Kinderopvang
                              </option>

                              <option value="MBO - Pedagogisch Werker 4" >
                                  MBO - Pedagogisch Werker 4
                              </option>

                              <option value="MBO - Pedagogisch Werker 4 Jeugdzorg" >
                                  MBO - Pedagogisch Werker 4 Jeugdzorg
                              </option>

                              <option value="MBO - Pedagogisch Werker 4 Kinderopvang" >
                                  MBO - Pedagogisch Werker 4 Kinderopvang
                              </option>

                              <option value="MBO - Persoonlijk begeleider Gehandicaptenzorg" >
                                  MBO - Persoonlijk begeleider Gehandicaptenzorg
                              </option>

                              <option value="MBO - Persoonlijk begeleider Gehandicaptenzorg" >
                                  MBO - Persoonlijk begeleider Gehandicaptenzorg
                              </option>

                              <option value="MBO - Persoonlijk begeleider specifieke doelgroepen" >
                                  MBO - Persoonlijk begeleider specifieke doelgroepen
                              </option>

                              <option value="MBO - Residentieel Werk" >
                                  MBO - Residentieel Werk
                              </option>

                              <option value="MBO - Sociaal-agogisch II (SA II) richting kultureel werk" >
                                  MBO - Sociaal-agogisch II (SA II) richting kultureel werk
                              </option>

                              <option value="MBO - Sociaal-agogisch II (SA II) richting residentiele hulpverlening" >
                                  MBO - Sociaal-agogisch II (SA II) richting residentiele hulpverlening
                              </option>

                              <option value="MBO - Sociaal-agogisch II (SA II) richting residentiële hulpverlening + kwa." >
                                  MBO - Sociaal-agogisch II (SA II) richting residentiële hulpverlening + kwa.
                              </option>

                              <option value="MBO - Sociaal Cultureel Werker" >
                                  MBO - Sociaal Cultureel Werker
                              </option>

                              <option value="MBO - Sociaal Dienstverlener (SD)" >
                                  MBO - Sociaal Dienstverlener (SD)
                              </option>

                              <option value="Mbo - Sociaal Maatschappelijk Dienstverlener" >
                                  Mbo - Sociaal Maatschappelijk Dienstverlener
                              </option>

                              <option value="MBO - Sociaal Pedagogisch Werker 3" >
                                  MBO - Sociaal Pedagogisch Werker 3
                              </option>

                              <option value="MBO - Sociaal Pedagogisch Werker 4" >
                                  MBO - Sociaal Pedagogisch Werker 4
                              </option>

                              <option value="Mbo - Sociaal Werker" >
                                  Mbo - Sociaal Werker
                              </option>

                              <option value="MBO - Sociale Arbeid (SA)" >
                                  MBO - Sociale Arbeid (SA)
                              </option>

                              <option value="MBO - Sport en bewegen (niveau 3 + 4)" >
                                  MBO - Sport en bewegen (niveau 3 + 4)
                              </option>

                              <option value="MBO - Sport- en bewegingscoördinator (niveau 4)" >
                                  MBO - Sport- en bewegingscoördinator (niveau 4)
                              </option>

                              <option value="MBO - Sport- en bewegingsleider (niveau 3)" >
                                  MBO - Sport- en bewegingsleider (niveau 3)
                              </option>

                              <option value="MBO - Vakopleiding Leidster Kindercentra" >
                                  MBO - Vakopleiding Leidster Kindercentra
                              </option>

                              <option value="MBO - Verdere scholing in dienstverband (VSID) richting kinderdagverblijven" >
                                  MBO - Verdere scholing in dienstverband (VSID) richting kinderdagverblijven
                              </option>

                              <option value="MBO - Verpleegkunde" >
                                  MBO - Verpleegkunde
                              </option>

                              <option value="MBO - Verpleegkunde A" >
                                  MBO - Verpleegkunde A
                              </option>

                              <option value="MBO - Verpleegkunde B" >
                                  MBO - Verpleegkunde B
                              </option>

                              <option value="MBO - Verpleegkunde Z" >
                                  MBO - Verpleegkunde Z
                              </option>

                              <option value="MBO - Verpleegkundige" >
                                  MBO - Verpleegkundige
                              </option>

                              <option value="MBO - Verplegende (VP)" >
                                  MBO - Verplegende (VP)
                              </option>

                              <option value="MBO - Verpleging (VP)" >
                                  MBO - Verpleging (VP)
                              </option>

                              <option value="MBO - Verzorgende beroepen (VZ)" >
                                  MBO - Verzorgende beroepen (VZ)
                              </option>

                              <option value="MBO - Verzorgende Individuele Gezondheidsszorg (VIG)" >
                                  MBO - Verzorgende Individuele Gezondheidsszorg (VIG)
                              </option>

                              <option value="Medicate Uitreiken en Toedienen (Certificaat)" >
                                  Medicate Uitreiken en Toedienen (Certificaat)
                              </option>

                              <option value="Msc - Pedagogische Wetenschappen" >
                                  Msc - Pedagogische Wetenschappen
                              </option>

                              <option value="Omgaan met jonge kinderen (certificaat)" >
                                  Omgaan met jonge kinderen (certificaat)
                              </option>

                              <option value="Pedagogisch Coach/Beleidsmedewerker" >
                                  Pedagogisch Coach/Beleidsmedewerker
                              </option>

                              <option value="Pedagogisch Coach (Certificaat)" >
                                  Pedagogisch Coach (Certificaat)
                              </option>

                              <option value="Piramide" >
                                  Piramide
                              </option>

                              <option value="Piramide - VVE" >
                                  Piramide - VVE
                              </option>

                              <option value="Taaleis 3F (Certificaat)" >
                                  Taaleis 3F (Certificaat)
                              </option>

                              <option value="Tink Training" >
                                  Tink Training
                              </option>

                              <option value="VOG" >
                                  VOG
                              </option>

                              <option value="VVE Certificaat (Start / In opleiding)" >
                                  VVE Certificaat (Start / In opleiding)
                              </option>

                              <option value="VVE, Kaleidoscoop" >
                                  VVE, Kaleidoscoop
                              </option>

                              <option value="VVE, Uk en Puk methode (Certificaat)" >
                                  VVE, Uk en Puk methode (Certificaat)
                              </option>

                              <option value="VVE, Vroege Voorschoolse Educatie (Certificaat)" >
                                  VVE, Vroege Voorschoolse Educatie (Certificaat)
                              </option>

                              <option value="Werken met Tilliften (Certificaat)" >
                                  Werken met Tilliften (Certificaat)
                              </option>

                              <option value="Werkervaring i.v.m. Overgangsregeling" >
                                  Werkervaring i.v.m. Overgangsregeling
                              </option>
                          </select>
                          </div>
                        </div>
                      </>
                    )
                  }
                  <div style={{borderRight:"1px #555 solid"}}>
                    <div className='search_result_filter_hours_trigger' onClick={()=>setShowHours(!showHours)}>
                      <BsClock/>
                      <p>
                        Hours per week
                      </p>
                      <MdOutlineKeyboardArrowDown/>
                    </div>
                    {showHours&&(
                      <div className="search_result_filter_hours_week">
                        <div style={{width:'100%',justifyContent:"space-between"}}>
                          <h4>
                            <b>
                              {!freelancer?"Advanced search, how many hours do you want to work?":"Are you looking for a freelancer who is available full-time or part-time ?"}
                            </b>
                          </h4>
                          <AiOutlineClose style={{fontSize:"29px",cursor:"pointer"}} onClick={()=>setShowHours(false)}/>
                        </div>
                        <div>
                          <div>
                            <input type="checkbox" name="part_time" defaultChecked={data.current?.assignment?.working_hours?.values?.includes("part%")} id=""  onChange={(e)=>e.target.checked?searchHandler(false,"working_hours","like","part%"):searchHandler(true,"working_hours","like","part%")} />
                            <label htmlFor="part_time">Part-time</label>
                          </div>
                          <div>
                            <input type="checkbox" name="full_time" defaultChecked={data.current?.assignment?.working_hours?.values?.includes("full%")}  onChange={(e)=>e.target.checked?searchHandler(false,"working_hours","like","full%"):searchHandler(true,"working_hours","like","full%")}/>
                            <label htmlFor="full_time">Full-time</label>
                          </div>
                        </div>
                        <div style={{justifyContent:"flex-start"}}>
                          <button style={{width:"150px",height:"40px"}} onClick={()=>setShowHours(false)}>
                            Show {research.data?.length&&"("+(research.data.length-1)+")"} results
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {
                    freelancer&&(
                      <>
                        <div style={{flexDirection:"column",margin:"0px 0px"}} className="hourly_wage">
                          <p style={{marginBottom:"5px"}} id='hourly_wage'>
                          Hourly wage {hourlyRate} €
                          </p>
                          {/* <HourlyRate/> */}
                          <div class="range-container">
                              <span className="arrow-left" onClick={()=>decreaseValue()}> <BiLeftArrow/>  </span>
                              <input type="range" name="" defaultValue={data.current?.freelancer?.hourlyRate?.values||hourlyRate} min={0}  max={2000} id="myRange"
                                ref={ref=>ref!==null&&(slider.current = ref)}
                                onChange={(e)=>setHourlyRate(parseInt(e.target.value))} 
                                onInput={(e)=>setHourlyRate(parseInt(e.target.value))}   
                                style={{width:"100%"}} />
                              <span className="arrow-right" onClick={()=>increaseValue()}> <BiRightArrow/> </span>
                          </div>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                              <p style={{fontSize:"11px"}}>
                                  0
                              </p>
                              <p style={{fontSize:"11px"}}>
                                  1000
                              </p>
                              <p style={{fontSize:"11px"}}>
                                  2000
                              </p>
                          </div>
                        </div>
                        <select 
                          name="currency" 
                          id="" 
                          style={{borderLeft:"1px #555 solid",height:"40px"}} 
                          onChange={
                            e=>
                            e.target.value?.length>0
                            ?(searchHandler(false,"currency","=",e.target.value),searchHandler(false,"hourly_rate","<=",hourlyRate)                            )
                            :searchHandler(false,"job_name","like ",data.current?.assignment?.job_name?.values)
                          }
                        >
                          <option value={"EUR"}>select a currency</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AFN"} value="AFN">Afghan Afghani</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ALL"} value="ALL">Albanian Lek</option>
                          <option selected={data.current?.freelancer?.currency?.values==="DZD"} value="DZD">Algerian Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AOA"} value="AOA">Angolan Kwanza</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ARS"} value="ARS">Argentine Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AMD"} value="AMD">Armenian Dram</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AWG"} value="AWG">Aruban Florin</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AUD"} value="AUD">Australian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AZN"} value="AZN">Azerbaijani Manat</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BSD"} value="BSD">Bahamian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BHD"} value="BHD">Bahraini Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BDT"} value="BDT">Bangladeshi Taka</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BBD"} value="BBD">Barbadian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BYR"} value="BYR">Belarusian Ruble</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BEF"} value="BEF">Belgian Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BZD"} value="BZD">Belize Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BMD"} value="BMD">Bermudan Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BTN"} value="BTN">Bhutanese Ngultrum</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BOB"} value="BOB">Bolivian Boliviano</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BAM"} value="BAM">Bosnia-Herzegovina Convertible Mark</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BWP"} value="BWP">Botswanan Pula</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BRL"} value="BRL">Brazilian Real</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GBP"} value="GBP">British Pound Sterling</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BND"} value="BND">Brunei Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BGN"} value="BGN">Bulgarian Lev</option>
                          <option selected={data.current?.freelancer?.currency?.values==="BIF"} value="BIF">Burundian Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KHR"} value="KHR">Cambodian Riel</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CAD"} value="CAD">Canadian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CVE"} value="CVE">Cape Verdean Escudo</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KYD"} value="KYD">Cayman Islands Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="XOF"} value="XOF">CFA Franc BCEAO</option>
                          <option selected={data.current?.freelancer?.currency?.values==="XAF"} value="XAF">CFA Franc BEAC</option>
                          <option selected={data.current?.freelancer?.currency?.values==="XPF"} value="XPF">CFP Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CLP"} value="CLP">Chilean Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CNY"} value="CNY">Chinese Yuan</option>
                          <option selected={data.current?.freelancer?.currency?.values==="COP"} value="COP">Colombian Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KMF"} value="KMF">Comorian Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CDF"} value="CDF">Congolese Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CRC"} value="CRC">Costa Rican ColÃ³n</option>
                          <option selected={data.current?.freelancer?.currency?.values==="HRK"} value="HRK">Croatian Kuna</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CUC"} value="CUC">Cuban Convertible Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CZK"} value="CZK">Czech Republic Koruna</option>
                          <option selected={data.current?.freelancer?.currency?.values==="DKK"} value="DKK">Danish Krone</option>
                          <option selected={data.current?.freelancer?.currency?.values==="DJF"} value="DJF">Djiboutian Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="DOP"} value="DOP">Dominican Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="XCD"} value="XCD">East Caribbean Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="EGP"} value="EGP">Egyptian Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ERN"} value="ERN">Eritrean Nakfa</option>
                          <option selected={data.current?.freelancer?.currency?.values==="EEK"} value="EEK">Estonian Kroon</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ETB"} value="ETB">Ethiopian Birr</option>
                          <option selected={data.current?.freelancer?.currency?.values==="EUR"} value="EUR">Euro</option>
                          <option selected={data.current?.freelancer?.currency?.values==="FKP"} value="FKP">Falkland Islands Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="FJD"} value="FJD">Fijian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GMD"} value="GMD">Gambian Dalasi</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GEL"} value="GEL">Georgian Lari</option>
                          <option selected={data.current?.freelancer?.currency?.values==="DEM"} value="DEM">German Mark</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GHS"} value="GHS">Ghanaian Cedi</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GIP"} value="GIP">Gibraltar Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GRD"} value="GRD">Greek Drachma</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GTQ"} value="GTQ">Guatemalan Quetzal</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GNF"} value="GNF">Guinean Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="GYD"} value="GYD">Guyanaese Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="HTG"} value="HTG">Haitian Gourde</option>
                          <option selected={data.current?.freelancer?.currency?.values==="HNL"} value="HNL">Honduran Lempira</option>
                          <option selected={data.current?.freelancer?.currency?.values==="HKD"} value="HKD">Hong Kong Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="HUF"} value="HUF">Hungarian Forint</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ISK"} value="ISK">Icelandic KrÃ³na</option>
                          <option selected={data.current?.freelancer?.currency?.values==="INR"} value="INR">Indian Rupee</option>
                          <option selected={data.current?.freelancer?.currency?.values==="IDR"} value="IDR">Indonesian Rupiah</option>
                          <option selected={data.current?.freelancer?.currency?.values==="IRR"} value="IRR">Iranian Rial</option>
                          <option selected={data.current?.freelancer?.currency?.values==="IQD"} value="IQD">Iraqi Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ILS"} value="ILS">Israeli New Sheqel</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ITL"} value="ITL">Italian Lira</option>
                          <option selected={data.current?.freelancer?.currency?.values==="JMD"} value="JMD">Jamaican Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="JPY"} value="JPY">Japanese Yen</option>
                          <option selected={data.current?.freelancer?.currency?.values==="JOD"} value="JOD">Jordanian Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KZT"} value="KZT">Kazakhstani Tenge</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KES"} value="KES">Kenyan Shilling</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KWD"} value="KWD">Kuwaiti Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KGS"} value="KGS">Kyrgystani Som</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LAK"} value="LAK">Laotian Kip</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LVL"} value="LVL">Latvian Lats</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LBP"} value="LBP">Lebanese Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LSL"} value="LSL">Lesotho Loti</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LRD"} value="LRD">Liberian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LYD"} value="LYD">Libyan Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LTL"} value="LTL">Lithuanian Litas</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MOP"} value="MOP">Macanese Pataca</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MKD"} value="MKD">Macedonian Denar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MGA"} value="MGA">Malagasy Ariary</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MWK"} value="MWK">Malawian Kwacha</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MYR"} value="MYR">Malaysian Ringgit</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MVR"} value="MVR">Maldivian Rufiyaa</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MRO"} value="MRO">Mauritanian Ouguiya</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MUR"} value="MUR">Mauritian Rupee</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MXN"} value="MXN">Mexican Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MDL"} value="MDL">Moldovan Leu</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MNT"} value="MNT">Mongolian Tugrik</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MAD"} value="MAD">Moroccan Dirham</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MZM"} value="MZM">Mozambican Metical</option>
                          <option selected={data.current?.freelancer?.currency?.values==="MMK"} value="MMK">Myanmar Kyat</option>
                          <option selected={data.current?.freelancer?.currency?.values==="NAD"} value="NAD">Namibian Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="NPR"} value="NPR">Nepalese Rupee</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ANG"} value="ANG">Netherlands Antillean Guilder</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TWD"} value="TWD">New Taiwan Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="NZD"} value="NZD">New Zealand Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="NIO"} value="NIO">Nicaraguan CÃ³rdoba</option>
                          <option selected={data.current?.freelancer?.currency?.values==="NGN"} value="NGN">Nigerian Naira</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KPW"} value="KPW">North Korean Won</option>
                          <option selected={data.current?.freelancer?.currency?.values==="NOK"} value="NOK">Norwegian Krone</option>
                          <option selected={data.current?.freelancer?.currency?.values==="OMR"} value="OMR">Omani Rial</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PKR"} value="PKR">Pakistani Rupee</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PAB"} value="PAB">Panamanian Balboa</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PGK"} value="PGK">Papua New Guinean Kina</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PYG"} value="PYG">Paraguayan Guarani</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PEN"} value="PEN">Peruvian Nuevo Sol</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PHP"} value="PHP">Philippine Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="PLN"} value="PLN">Polish Zloty</option>
                          <option selected={data.current?.freelancer?.currency?.values==="QAR"} value="QAR">Qatari Rial</option>
                          <option selected={data.current?.freelancer?.currency?.values==="RON"} value="RON">Romanian Leu</option>
                          <option selected={data.current?.freelancer?.currency?.values==="RUB"} value="RUB">Russian Ruble</option>
                          <option selected={data.current?.freelancer?.currency?.values==="RWF"} value="RWF">Rwandan Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SVC"} value="SVC">Salvadoran ColÃ³n</option>
                          <option selected={data.current?.freelancer?.currency?.values==="WST"} value="WST">Samoan Tala</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SAR"} value="SAR">Saudi Riyal</option>
                          <option selected={data.current?.freelancer?.currency?.values==="RSD"} value="RSD">Serbian Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SCR"} value="SCR">Seychellois Rupee</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SLL"} value="SLL">Sierra Leonean Leone</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SGD"} value="SGD">Singapore Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SKK"} value="SKK">Slovak Koruna</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SBD"} value="SBD">Solomon Islands Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SOS"} value="SOS">Somali Shilling</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ZAR"} value="ZAR">South African Rand</option>
                          <option selected={data.current?.freelancer?.currency?.values==="KRW"} value="KRW">South Korean Won</option>
                          <option selected={data.current?.freelancer?.currency?.values==="XDR"} value="XDR">Special Drawing Rights</option>
                          <option selected={data.current?.freelancer?.currency?.values==="LKR"} value="LKR">Sri Lankan Rupee</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SHP"} value="SHP">St. Helena Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SDG"} value="SDG">Sudanese Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SRD"} value="SRD">Surinamese Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SZL"} value="SZL">Swazi Lilangeni</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SEK"} value="SEK">Swedish Krona</option>
                          <option selected={data.current?.freelancer?.currency?.values==="CHF"} value="CHF">Swiss Franc</option>
                          <option selected={data.current?.freelancer?.currency?.values==="SYP"} value="SYP">Syrian Pound</option>
                          <option selected={data.current?.freelancer?.currency?.values==="STD"} value="STD">São Tomé and Príncipe Dobra</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TJS"} value="TJS">Tajikistani Somoni</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TZS"} value="TZS">Tanzanian Shilling</option>
                          <option selected={data.current?.freelancer?.currency?.values==="THB"} value="THB">Thai Baht</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TOP"} value="TOP">Tongan pa'anga</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TTD"} value="TTD">Trinidad & Tobago Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TND"} value="TND">Tunisian Dinar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TRY"} value="TRY">Turkish Lira</option>
                          <option selected={data.current?.freelancer?.currency?.values==="TMT"} value="TMT">Turkmenistani Manat</option>
                          <option selected={data.current?.freelancer?.currency?.values==="UGX"} value="UGX">Ugandan Shilling</option>
                          <option selected={data.current?.freelancer?.currency?.values==="UAH"} value="UAH">Ukrainian Hryvnia</option>
                          <option selected={data.current?.freelancer?.currency?.values==="AED"} value="AED">United Arab Emirates Dirham</option>
                          <option selected={data.current?.freelancer?.currency?.values==="UYU"} value="UYU">Uruguayan Peso</option>
                          <option selected={data.current?.freelancer?.currency?.values==="USD"} value="USD">US Dollar</option>
                          <option selected={data.current?.freelancer?.currency?.values==="UZS"} value="UZS">Uzbekistan Som</option>
                          <option selected={data.current?.freelancer?.currency?.values==="VUV"} value="VUV">Vanuatu Vatu</option>
                          <option selected={data.current?.freelancer?.currency?.values==="VEF"} value="VEF">Venezuelan BolÃ­var</option>
                          <option selected={data.current?.freelancer?.currency?.values==="VND"} value="VND">Vietnamese Dong</option>
                          <option selected={data.current?.freelancer?.currency?.values==="YER"} value="YER">Yemeni Rial</option>
                          <option selected={data.current?.freelancer?.currency?.values==="ZMK"} value="ZMK">Zambian Kwacha</option>
                        </select>
                      </>
                    )
                  }
                  {
                    !freelancer&&(
                      <div style={{borderRight:"1px #555 solid"}}>
                        <div onClick={()=>setShowTypeAssignment(!showTypeAssignment)} style={{cursor:"pointer",width:"170px"}} >
                          <p>
                            Type of assignment
                          </p>
                          <MdOutlineKeyboardArrowDown/>
                        </div>
                        {
                          showTypeAssignment&&(
                            <div className='search_result_show_assignment_type'>
                              <div>
                                <p>
                                  All
                                </p>
                                <input type="radio" name="type_assignment" id="" checked={data.current.assignment?.pay_type?.values?.length===0||data.current.assignment?.pay_type?.values?.length===2}  onClick={e=>{searchHandler(false,"pay_type","like",["%piece","%hour"])}} />
                              </div>
                              <div>
                                <p>
                                  Apiece
                                </p>
                                <input type="radio" name="type_assignment" id="" checked={data.current.assignment?.pay_type?.values?.length === 1 && data.current.assignment?.pay_type?.values.includes("%piece")}  onClick={e=>{data.current.assignment["pay_type"].values = data.current.assignment["pay_type"].values.filter(item=>item!=="%hour"); searchHandler(false,"pay_type","like","%piece");}} />
                              </div>
                              <div>
                                <p>
                                  Per hour
                                </p>
                                <input type="radio" name="type_assignment" id=""  checked={data.current.assignment?.pay_type?.values?.length === 1 && data.current.assignment?.pay_type?.values.includes("%hour")} onClick={e=>{data.current.assignment["pay_type"].values = data.current.assignment["pay_type"].values.filter(item=>item!=="%piece"); searchHandler(false,"pay_type","like","%hour");}}/>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    !freelancer&&(
                      <div>
                        <div style={{width:"170px"}}>
                          <div onClick={()=>setShowEstimated(!showEstimated)} style={{cursor:"pointer"}}>
                            <p>
                              Estimated lead time
                            </p>
                            <MdOutlineKeyboardArrowDown/>
                          </div>
                          {
                            showEstimated&&(
                              <div className='search_result_show_estimated_time'>
                                <div>
                                  <p>
                                    {"<"} 1 month
                                  </p>
                                  <input type="checkbox" name="estimated_time" checked={data.current.assignment?.job_duration?.values?.includes("<1 month")} id="" onChange={e=>e.target.checked?(searchHandler(false,"job_duration","=","<1 month")):searchHandler(true,"job_duration","like","<1 month")}/>
                                </div>
                                <div>
                                  <p>
                                    1 - 3 months
                                  </p>
                                  <input type="checkbox" name="estimated_time" id="" checked={data.current?.assignment?.job_duration?.values?.includes("1-3 months")} onChange={e=>e.target.checked?(searchHandler(false,"job_duration","=","1-3 months")):searchHandler(true,"job_duration","like","1-3 months")} />
                                </div>
                                <div>
                                  <p>
                                    3 - 6 months
                                  </p>
                                  <input type="checkbox" name="estimated_time" id="" checked={data.current?.assignment?.job_duration?.values?.includes("3-6 months")}  onChange={e=>e.target.checked?(searchHandler(false,"job_duration","=","3-6 months")):searchHandler(true,"job_duration","like","3-6 months")}/>
                                </div>
                                <div>
                                  <p>
                                    {">"} 6 months
                                  </p>
                                  <input type="checkbox" name="estimated_time" id="" checked={data.current?.assignment?.job_duration?.values?.includes(">6 months")} onChange={e=>e.target.checked?(searchHandler(false,"job_duration","=",">6 months")):searchHandler(true,"job_duration","like",">6 months")} />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="search_results_layout">
                <div>
                  <div style={{marginRight:"10px"}}>
                    <p style={{margin:"0",marginRight:"5px"}}>
                      Sort by
                    </p>
                    <select name="sort_by" id="" style={{border:"1px #ccc solid",outline:"none",borderRadius:"4px"}} onChange={e=>{setElts([...elts.reverse()])}}>
                      <option value="latest" selected={location.state?.sort_by==="latest"}>Latest</option>
                      <option value="oldest" selected={location.state?.sort_by==="oldest"}>Oldest</option>
                    </select>
                  </div>
                  <TbLayoutGrid className={layout?"":'selected'} onClick={()=>setLayout(false)}/>
                  <TbLayoutList className={!layout?"":'selected'} onClick={()=>setLayout(true)}/>
                </div>
                <div>
                  <Link to="" onClick={()=>clearFilters()}>
                    clear filters
                  </Link>
                </div>
              </div>
            </div>
            <div className="search_results_elements_container" style={{flexDirection:layout?"column":"row"}}>
              {

                elts?.map(item=>(
                  item.id&&(
                    <SingleResult freelancer={freelancer} sideBySide={!layout} data={{...item,...(research?.data?.at(-1)?.find(elt=>elt.user_id===item.id)),target:"/search"}}/>
                  )
                ))
              }
            </div>

            {
              //link to redirect un logged in users
              <Link to="/login" state={{...location.state,target:"/search"}} ref={ref=>ref!==null&&(linkRef.current = ref)}>

              </Link>
            }
            {
              (!elts||elts?.length===0)&&(
                <div>
                    <p style={{color:"#c33826"}}>
                        Your search {data.current?.freelancer?.profession?.values?.length>0?" for "+data.current?.freelancer?.profession.values?.replace(/%/gi,""):data.current?.assignment?.job_name?.values?.length>0?" for "+data.current?.assignment?.job_name.values?.replace(/%/gi,""):""} did not yield any suitable projects. <br />
                        Edit your search to see more results. For example, think of : <br />
                        <br />

                        <ul>
                          <li>
                            Removing one or more filters.
                          </li>
                          <li>
                            Adjust the job title and check for spelling mistakes.
                          </li>
                          <li>
                            Ticking multiple fields.
                          </li>
                          <li>
                            Did you search by zip code? Then check whether you have used a complete zip code , for example 1234 AB
                          </li>
                        </ul>
                        <br />

                    </p>
                </div>
              )
            }
      </div>
      {
        (!elts || elts?.length===0)&&(
          <div className="search_result_banner">
            <div className='search_result_banner_container'>
              <div>
                  <p>
                    Search by keywords, industry, for a <br />
                    suitable assignment or freelancer.
                  </p>
                  <p>
                    You can also go directly to our <br /> 
                    overview of assignments or freelancers.
                  </p>
              </div>
              <div>
                <Link to="" onClick={()=>{setFreelancer(true);clearFilters();/*setalter(true) */}}>
                  <button>
                    Overview freelancers
                  </button>
                </Link>
              </div>
              <div>
                <img src="./images/searchFreelancer.png" alt="" />
              </div>
            </div>
            <div className='search_result_banner_container'>
              <div>

              </div>
              <div>
                <Link to="" onClick={()=>{setFreelancer(false);clearFilters();/*setalter(true)*/}}>
                  <button>
                    Overview assignments
                  </button>
                </Link>
              </div>
              <div>
                <img src="./images/searchJob.png" alt="" />
              </div>
            </div>
          </div>
        )
      }
      {
        research.data?.length>eltsIndex&&(
          <div className="search_result_footer" onClick={()=>showMoreItems()}>
            <button>
              Show more
            </button>
          </div>
        )
      }
      <Footer/>
    </div>
  )
}
