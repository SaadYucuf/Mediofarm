import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const TaskComponent = () => {
    let { id } = useParams()
    const [partData, setPartData] = useState([])

    useEffect(() => {
        getPart()
    }, [id])

    async function getPart() {
        try {
            let { data } = await axios.get(`http://localhost:5000/api/part/part/${id}`)
            setPartData(data);
        } catch (error) {
            console.log(error)
        }
    }

    console.log(partData);


    return (
        <div>
            <h1>{partData.projectData?.part_number}</h1>
            <a href={partData.projectData?.link}>{partData.projectData?.link}</a>
            {partData.partData?.map((e) => {
                return (
                    <div>
                        <span>{e.link}</span>
                        <p>{e.file_name}</p>
                    </div>
                )
            })}
        </div>
    )
}