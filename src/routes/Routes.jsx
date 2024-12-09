import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Publications from "../pages/Publications/Publications";
import Upload from "../pages/Upload/upload";
import Index from "../pages/Index/Index";
import CreateEntrepreneur from "../pages/CreateEntrepreneur/CreateEntrepreneur";
import Entrepreneurs from "../pages/Entrepreneurs/Entrepreneurs";
import CreateCategory from "../pages/CreateCategory/CreateCategory"
import Categories from "../pages/Categories/Categories";
import ReglaDeTres from "../pages/ReglaDeTres/ReglaDeTres";
import FormularioPrecio from "../components/FormularioPrecio/FormularioPrecio";
import UserProfile from "../pages/UserProfile/UserProfile"; 
export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Index/>
                },
                {
                    path: '/publicaciones',
                    element: <Publications/>
                },
                {
                    path: '/publicaciones/crearPublicacion',
                    element: <Upload/>
                },
                {
                    path: '/inicio',
                    element: <Index/>
                },
                {
                    path: '/emprendimientos',
                    element: <Entrepreneurs/>
                },
                {
                    path: '/categorias',
                    element: <Categories/>
                },
                {
                    path: '/categorias/crearCategoria',
                    element: <CreateCategory/>
                },
                {
                    path: '/testCalculo',
                    element: <FormularioPrecio/>
                },
                {
                    path: '/testtres',
                    element: <ReglaDeTres/>
                },
                {
                    path:'/emprendimientos/crearEmprendimiento',
                    element:<CreateEntrepreneur/>
                },

                {
                    path: '/perfil',
                    element: <UserProfile />
                }
            ],
        }
    ]

    return useRoutes(routes);
}

