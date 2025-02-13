import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Notfound from "./Components/NotFound/Notfound"
import Home from "./Pages/Home/Home"
import TokenContext from "./Context/TokenContext"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth"


function App() {
  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
        { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth> },
        { path: "register", element: <ProtectedAuth><Register /></ProtectedAuth> },
        { path: "*", element: <Notfound /> }
      ]
    }
  ])
  return (
    <>
      <TokenContext>
        <RouterProvider router={routes}></RouterProvider>
      </TokenContext>
    </>
  )
}

export default App
