import { createBrowserRouter } from 'react-router';
import Home from './component/Home';
import UserDetails from './component/UserDetails';
import RecipeContainer from './component/RecipeContainer';

export const router = createBrowserRouter([
    {
        path: '/', element: <UserDetails />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <Home /> },
            {
                path: 'recipe', element: <RecipeContainer />, children: [
                    { path: 'recipe/:id', element: '' }
                ]
            }
        ]
    }
])