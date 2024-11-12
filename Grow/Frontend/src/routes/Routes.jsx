import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Publications from "../pages/Publications/Publications";
import Upload from "../pages/Upload/upload";

export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
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

