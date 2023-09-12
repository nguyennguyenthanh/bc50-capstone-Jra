import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
  {
    path: '',
    element: lazy(() => import('./../pages/HomeTemplate')),
    nested: [
      {
        path: '',
        element: lazy(() => import('../pages/HomeTemplate/ProjectPage'))
      },
      {
        path: '/create-project',
        element: lazy(() => import('../pages/HomeTemplate/CreateProjectPage'))
      },
      {
        path: '/update-project',
        element: lazy(() => import('../pages/HomeTemplate/UpdateProjectPage'))
      },
    ],
  },
  {
    path: "user-login",
    element: lazy(() => import("../pages/UserLoginTemplate")),
    nested: [
      {
        path: "auth",
        element: lazy(() => import("../pages/UserLoginTemplate/LoginPage")),
      },

    ],
  },
  {
    path: "register",
    element: lazy(() => import("../pages/UserLoginTemplate/RegisterPage")),
  },
]


const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>{
          route.nested.map((item) =>
            <Route key={item.path} path={item.path} element={<item.element />} />
          )
        }</Route>
      )
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}></Route>
      )
    }
  })
}


export default renderRoutes;