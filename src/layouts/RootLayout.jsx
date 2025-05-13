import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <div className="movie-container">
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;