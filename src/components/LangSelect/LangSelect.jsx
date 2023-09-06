import React, { useEffect, useRef, useState } from 'react'
import "./langSelect.scss"
import { lang } from '../../languages_data'
import { BsTrashFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { get_lang_action, set_lang_action } from '../../state/Actions/UserAction'
import { IoAddOutline } from 'react-icons/io5'

export default function LangSelect({ freelancer = true, save = false, hide = false }) {
    const user_info = useSelector(state => state.user_info);
    const get_lang = useSelector(state => state.get_lang);
    const add_assignement = useSelector(state => state.add_assignement);
    const [langRef, setLangRef] = useState({ lng: [], level: [] })
    const divRef = useRef([]);
    const [iDontSpeakOtherLangs, setiDontSpeakOtherLangs] = useState(get_lang.data?.at(0)?get_lang.data?.at(0)?.i_dont_speak_other_langs === 1:true)
    const dispatch = useDispatch();

    console.log(iDontSpeakOtherLangs)
    console.log("cc")
    useEffect(() => {
        dispatch(get_lang_action(user_info.user.token));
    }, [dispatch, user_info.user.token])


    useEffect(() => {
        if (get_lang.data?.length > 0) {
            let eltLang = get_lang.data?.map((elt) =>
                <select name="lang" disabled={iDontSpeakOtherLangs} id="">
                    {
                        Object.entries(lang)?.map(item => (
                            <option selected={elt?.lang ? item[0] === elt.lang : item[0] === "en"} value={item[0]}>
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
            )

            let eltLevel = get_lang.data?.map((elt, idx) =>
                <div>
                    <select name="level" disabled={iDontSpeakOtherLangs} id="">
                        <option value="basic" selected={elt?.level === "basic"}>
                            Basis
                        </option>
                        <option value="limited" selected={elt?.level === "limited"}>
                            Limited
                        </option>
                        <option value="professional" selected={elt?.level === "professional"}>
                            Professional
                        </option>
                        <option value="mother_tongue" selected={elt?.level === "mother_tongue"}>
                            Mother tongue
                        </option>
                    </select>
                    {
                        idx !== 0 && (
                            <BsTrashFill onClick={() => { deleteLang(idx) }} />
                        )
                    }
                </div>
            )
            setLangRef({
                lng: eltLang,
                level: eltLevel
            })
        }
        console.log("first")
    }, [get_lang.data, iDontSpeakOtherLangs])

    useEffect(() => {
        if (save || add_assignement.data) {
            let info = { data: [] };
            /*if (iDontSpeakOtherLangs) {
                setLangRef({
                    lng: langRef?.lng.shift(),
                    level: langRef?.level.shift()
                })
            }*/
            for (let i = 0; i < langRef?.lng?.length; i++) {
                let elt = document.getElementById(i);
                console.log(
                    {
                        lang: elt.firstElementChild.value,
                        level: elt.lastChild?.firstElementChild?.value
                    }
                )
                console.log(
                    {
                        lang: elt.firstElementChild,
                        level: elt.lastChild?.firstElementChild
                    }
                )
                if (elt.style.display !== "none") {
                    info.data.push({
                        lang: elt.firstElementChild.value,
                        level: elt.lastChild?.firstElementChild?.value
                    })
                }
            }
            info.update = true;
            info.other_langs = (iDontSpeakOtherLangs ? 1 : 0);
            if (!freelancer) {
                info.assignement_id = add_assignement.data;
            }
            console.log(info)
            dispatch(set_lang_action(info, user_info.user.token));
        }

    }, [add_assignement, dispatch, freelancer, iDontSpeakOtherLangs, langRef.level, langRef.lng, save, user_info.user.token])

    useEffect(() => {
        if (langRef.level.length === 0) {
            addLangHandler();
        }
    }, [langRef.level])

    //disable select areas when you dont speak any other lang
    useEffect(() => {
        for (let i = 0; i < langRef?.lng?.length; i++) {
            let elt = document.getElementById(i);
            console.log(
                {
                    lang: elt.firstElementChild.value,
                    level: elt.lastChild?.firstElementChild?.value
                }
            )
            console.log(
                {
                    lang: elt.firstElementChild,
                    level: elt.lastChild?.firstElementChild
                }
            )
            if (elt.style.display !== "none") {
                if (iDontSpeakOtherLangs) {
                    elt.firstElementChild.disabled = true;
                    elt.lastChild.firstElementChild.disabled = true;
                } else {
                    elt.firstElementChild.disabled = false;
                    elt.lastChild.firstElementChild.disabled = false;
                }
            }
        }
    }, [iDontSpeakOtherLangs, langRef?.lng?.length])

    const addLangHandler = () => {
        let eltLang = (
            <select name="lang" disabled={iDontSpeakOtherLangs} id="">
                {
                    Object.entries(lang)?.map(item => (
                        <option selected={item[0] === "en"} value={item[0]}>
                            {item[1]}
                        </option>
                    ))
                }
            </select>
        )

        let eltLevel = (
            <div>
                <select name="level" disabled={iDontSpeakOtherLangs} id="">
                    <option value="basic" selected>
                        Basis
                    </option>
                    <option value="limited">
                        Limited
                    </option>
                    <option value="professional">
                        Professional
                    </option>
                    <option value="mother_tongue">
                        Mother tongue
                    </option>
                </select>
                {
                    langRef.level?.length !== 0 && (
                        <BsTrashFill onClick={() => deleteLang(langRef.level.length)} />
                    )
                }
            </div>
        )
        setLangRef({
            lng: langRef.lng.concat([eltLang]),
            level: langRef.level.concat([eltLevel])
        })
    }

    const deleteLang = (idx) => {

        console.log(langRef, idx)
        document.getElementById(idx).style.display = "none";
        //setLangRef({lng:langRef.lng.filter((item,id)=>(id===idx)),level:langRef.level.filter((item,id)=>(id===idx))})
    }
    return (
        <div className="fav_lang" style={{ flexDirection: freelancer ? "row" : "column", opacity: hide ? "0" : "1", position: hide ? "absolute" : "initial" }}>
            {
                freelancer ? (
                    <div className="check_lang">
                        <div>
                            <span>
                                I don't speak any other languages
                            </span>
                            <input type="radio" name="other_language" defaultChecked={iDontSpeakOtherLangs} onClick={e => { setiDontSpeakOtherLangs(true) }} id="" />
                        </div>
                        <div>
                            <span>
                                I speak the following languages
                            </span>
                            <input type="radio" name="other_language" defaultChecked={!iDontSpeakOtherLangs} onClick={e => { setiDontSpeakOtherLangs(false) }} id="" />
                        </div>
                    </div>
                ) : (
                    <p>
                        Witch languages should the freelancer be able to speak for the assignement? {"  "}
                        <span className="red">*</span>
                    </p>
                )
            }
            <button style={{ display: !iDontSpeakOtherLangs ? "flex" : "none" }} ref={ref => ref !== null && (divRef.current["button"] = ref)} onClick={() => addLangHandler()}>
                <IoAddOutline />
            </button>
            <div className='lang_select'>
                {
                    langRef?.lng[0] && langRef?.lng?.map((item, idx) => (
                        <div className='select_lang_elt' name="lang" id={idx}>
                            {item}
                            {langRef.level?.at(idx)}
                        </div>
                    ))
                }
                {/* <div className="select_lang_elt" style={{display:"none"}} name="second_lang" ref={ref=>ref!==null&&(divRef.current.push(ref))}>
                <select name="second_lang"  ref={ref=>ref!==null&&(langRef[ref.name] = ref)}id="">
                    {
                        Object.entries(lang)?.map(item=>(
                            <option selected={item[0] === get_lang.data?.second_lang || item[0]==="en"} value={item[0]}>
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
                <div>
                    <select name="second_lang_level" ref={ref=>ref!==null&&(langRef[ref.name] = ref)}  id="">
                        <option value="basic" selected={get_lang.data?.second_lang_level ==="basic"}>
                            Basis
                        </option>
                        <option value="limited" selected={get_lang.data?.second_lang_level ==="limited"}>
                            Limited
                        </option>
                        <option value="professional" selected={get_lang.data?.second_lang_level ==="professional"}>
                            Professional
                        </option>
                        <option value="mother_tongue" selected={get_lang.data?.second_lang_level ==="mother_tongue"}>
                            Mother tongue
                        </option>
                    </select>
                    <BsTrashFill onClick={()=>handleDeleteRow(1,"second_lang","second_lang_level")}/>
                </div>
            </div>
            <div className="select_lang_elt" style={{display:"none"}} name="third_lang" ref={ref=>ref!==null&&(divRef.current.push(ref))}>
                <select name="third_lang"  ref={ref=>ref!==null&&(langRef[ref.name] = ref)}id="">
                    {
                        Object.entries(lang)?.map(item=>(
                            <option selected={item[0] === get_lang.data?.third_lang || item[0]==="en"} value={item[0]}>
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
                <div>
                    <select name="third_lang_level" ref={ref=>ref!==null&&(langRef[ref.name] = ref)} id="">
                        <option value="basic" selected={get_lang.data?.third_lang_level ==="basic"}>
                            Basis
                        </option>
                        <option value="limited" selected={get_lang.data?.third_lang_level ==="limited"}>
                            Limited
                        </option>
                        <option value="professional" selected={get_lang.data?.third_lang_level ==="professional"}>
                            Professional
                        </option>
                        <option value="mother_tongue" selected={get_lang.data?.third_lang_level ==="mother_tongue"}>
                            Mother tongue
                        </option>
                    </select>
                    <BsTrashFill onClick={()=>handleDeleteRow(2,"third_lang","third_lang_level")}/>
                </div>
            </div>
            <div className="select_lang_elt" style={{display:"none"}} name="fourth_lang" ref={ref=>ref!==null&&(divRef.current.push(ref))}>
                <select name="fourth_lang"  ref={ref=>ref!==null&&(langRef[ref.name] = ref)}id="">
                    {
                        Object.entries(lang)?.map(item=>(
                            <option selected={item[0] === get_lang.data?.fourth_lang || item[0]==="en"} value={item[0]}>
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
                <div>
                    <select name="fourth_lang_level" ref={ref=>ref!==null&&(langRef[ref.name] = ref)} id="">
                        <option value="basic" selected={get_lang.data?.fourth_lang_level ==="basic"}>
                            Basis
                        </option>
                        <option value="limited" selected={get_lang.data?.fourth_lang_level ==="limited"}>
                            Limited
                        </option>
                        <option value="professional" selected={get_lang.data?.fourth_lang_level ==="professional"}>
                            Professional
                        </option>
                        <option value="mother_tongue" selected={get_lang.data?.fourth_lang_level ==="mother_tongue"}>
                            Mother tongue
                        </option>
                    </select>
                    <BsTrashFill onClick={()=>handleDeleteRow(3,"fourth_lang","fourth_lang_level")}/>
                </div>
            </div>
            <div className="select_lang_elt" style={{display:"none"}} name="fifth_lang" ref={ref=>ref!==null&&(divRef.current.push(ref))}>
                <select name="fifth_lang"  ref={ref=>ref!==null&&(langRef[ref.name] = ref)}id="">
                    {
                        Object.entries(lang)?.map(item=>(
                            <option selected={item[0] === get_lang.data?.fifth_lang || item[0]==="en"} value={item[0]}>
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
                <div>
                    <select name="fifth_lang_level" ref={ref=>ref!==null&&(langRef[ref.name] = ref)} id="">
                        <option value="basic" selected={get_lang.data?.fifth_lang_level ==="basic"}>
                            Basis
                        </option>
                        <option value="limited" selected={get_lang.data?.fifth_lang_level ==="limited"}>
                            Limited
                        </option>
                        <option value="professional" selected={get_lang.data?.fifth_lang_level ==="professional"}>
                            Professional
                        </option>
                        <option value="mother_tongue" selected={get_lang.data?.fifth_lang_level ==="mother_tongue"}>
                            Mother tongue
                        </option>
                    </select>
                    <BsTrashFill onClick={()=>handleDeleteRow(4,"fifth_lang","fifth_lang_level")}/>
                </div>
            </div> */}
            </div>
        </div>
    )
}
