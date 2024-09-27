import { Outlet } from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'

export const MainLayout = () => {
    return (
        <div className='bigCont'>
            <Sidebar className='Sidebar' />
            <Outlet />
        </div>
    )
}