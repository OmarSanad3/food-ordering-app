import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import RootLayout from './components/Root'
import Home from './pages/Home'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <Home />},
    ]
  }
]);
function App() { 

  return <RouterProvider router={router} />;
}

export default App
