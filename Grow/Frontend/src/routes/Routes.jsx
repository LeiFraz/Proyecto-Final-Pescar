import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Publications from "../pages/Publications/Publications";

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
                }
            ],
        }
    ]

    return useRoutes(routes);
}

