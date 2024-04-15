
import style from './App.module.css'
import Form from './components/Form'
import DataTable from './components/Table';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DataTable />,
    },
    {
      path: "/products",
      element: <Form />,
    },

  ]);

  return (
    <div className={style.main}>
      <RouterProvider router={router} />    
    </div>
  )
}
export default App
