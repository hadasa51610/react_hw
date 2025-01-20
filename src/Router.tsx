import { createBrowserRouter } from 'react-router';
import About from './component/pages/About';
import Home from './component/pages/Home';
import UserDetails from './component/userDetails';

export const router = createBrowserRouter([
    {
        path: '/', element: <UserDetails />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: 'about', element: <About /> }
        ]
    }
])