import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail() {
    let [detail, setDetail] = useState(null)
    let params = useParams()
    const nav = useNavigate()
    useEffect(() => {
        axios.get(`https://backoffice.nodemy.vn/api/tasks/${params.id}`)
            .then(res => {
                setDetail(res.data.data)
            })
    }, [])
    return(
        <div>
            <button onClick={()=>{
                nav('/home')
            }}>Trang chu</button>
             {detail ? <h1>{detail?.attributes.title}</h1>:"Khong co gi o day ca!!!"}
        </div> 
    )
}