import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import NotFound from './pages/NotFound';
import RootLayout from './layouts/RootLayout';

import './css/app.css';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home/>} />
        <Route path='favorites' element={<Favorite/>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App

