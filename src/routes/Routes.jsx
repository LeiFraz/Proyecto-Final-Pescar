import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Publications from "../pages/Publications/Publications";
import Upload from "../pages/Upload/upload";
import CompanyUserProfile from "../pages/CompanyUserProfile/CompanyUserProfile";

export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
                {
                    path: '/Perfil',
                    element: <CompanyUserProfile/>
                },
                {
                    path: '/',
                    element: <Publications/>
                },
                {
                    path: '/publicaciones',
                    element: <Publications/>
                },
                {
                    path: '/publicaciones/crearPublicacion',
                    element: <Upload/>
                }
            ],
        }
    ]

    return useRoutes(routes);
}

