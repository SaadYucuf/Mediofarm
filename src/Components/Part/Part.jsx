import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PieChart } from '@mui/x-charts/PieChart';
// import { CiSearch } from "react-icons/ci";
import './Part.css'
import UserChart from './Charts/UserChart'

export const PartComponent = () => {
    const { id } = useParams()
    const [projectData, setProjectData] = useState([])
    const [partData, setPartData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPartData()
        fetchProjectData()
    }, [id])

    async function fetchPartData() {
        try {
            let { data } = await axios.get(`http://localhost:5000/api/part/${id}`)
            setPartData(data.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const filteredData = partData.filter(item =>
        Object.values(item).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    async function fetchProjectData() {
        try {
            let { data } = await axios.get(`http://localhost:5000/api/project/${id}`)
            setProjectData(data.project)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="dashboard-container">
                <div className='dashboard-content'>
                    <div className='breadcrumb'>
                        <Link to={-1} className='breadcrumb-span'>Проекты</Link>
                        <MdArrowForwardIos className='breadcrumb-arrow' aria-label="Next" />
                        <IoIosArrowRoundBack className='breadcrumb-left-arrow' aria-label="Back" />
                    </div>
                    <div className='project-header'>
                        <h1>{projectData.project_number}</h1>
                        <p>{projectData.folder_id}</p>
                    </div>
                    <div className='project-details-wrapper'>

                        <div className='project-details-grid'>
                            <div className='detail-item'>
                                <span className='detail-label'>Статус</span>
                                <span className='detail-value'>
                                    <span className='status-dot not-started'></span>
                                    Не запущено
                                </span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Имя ответственного</span>
                                <span className='detail-value'>Project manager</span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Дата начала</span>
                                <span className='detail-value'>21.08.2024</span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Общей кол задач</span>
                                <span className='detail-value'>103</span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Общей вып кол задач</span>
                                <span className='detail-value'>0</span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Кол выпол от общей</span>
                                <span className='detail-value'>0 / 103</span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Проценты</span>
                                <span className='detail-value'>0,00%</span>
                            </div>
                            <hr className="divider" />
                            <div className='detail-item'>
                                <span className='detail-label'>Место хранения папки</span>
                                <a href={projectData.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='detail-value folder-link'>
                                    {projectData.link}
                                </a>
                            </div>
                        </div>
                        <div className='empty-div'>

                            <div className="chart">
                                <UserChart />
                            </div>
                            <div className="chart">
                                <br />
                                <br />
                                <br />
                                <PieChart
                                    series={[{
                                        data: [
                                            { id: 0, value: 10, label: 'series A' },
                                            { id: 1, value: 15, label: 'series B' },
                                            { id: 2, value: 20, label: 'series C' },
                                        ],
                                    }]}
                                    colors={['#3f48cc', '#3f48cc', '#3f48cc']} // Custom colors
                                    width={400}
                                    height={200}
                                />

                            </div>

                        </div>
                    </div>


                </div>
                <div className='table-wrapper'>
                    <div className='table-container'>
                        <table className='details-table'>
                            <thead>
                                <tr>
                                    <th>Column 1</th>
                                    <th>Column 2</th>
                                    <th>Column 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.part_number}</td>
                                            {/* <td>{item.col2}</td> */}
                                            {/* <td>{item.col3}</td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}