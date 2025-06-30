import {
    createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AddQuery from "../Pages/AddQuery";
import MyQueries from "../Pages/MyQueries";
import PrivateRoute from "../provider/PrivateRoute";
import QueryDetails from "../Pages/QueryDetails";
import UpdateQuery from "../Pages/UpdateQuery";
import AllQueries from "../Pages/AllQueries";
import MyRecommendation from "../Pages/MyRecommendation";
import RecommendationsForMe from "../Pages/RecommendationsForMe";
import Error from "../Pages/Error";
import About from "../Pages/About";
import BlogDetails from "../Pages/BlogDetails";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                loader: () => fetch('https://suggesto-product-reco-server.vercel.app/queries'),
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>

            },
            {
                path: '/allQueries',
                element: <AllQueries></AllQueries>

            },
            {   
                path: '/blog/:id',
                element: <BlogDetails></BlogDetails>

            },
            {
                path: 'addQuery',
                element: <PrivateRoute>
                    <AddQuery></AddQuery>
                </PrivateRoute>
            },
            {
                path: 'myQueries',
                element: <PrivateRoute>
                    <MyQueries></MyQueries>
                </PrivateRoute>
            },
            {
                path: 'queryDetails/:id',
                element: <PrivateRoute>
                    <QueryDetails></QueryDetails>
                </PrivateRoute>
            },
            {
                path: 'updateQuery/:id',
                element: <PrivateRoute>
                    <UpdateQuery></UpdateQuery>
                </PrivateRoute>
            },
            {
                path: 'myRecommendations',
                element: <PrivateRoute>
                    <MyRecommendation></MyRecommendation>
                </PrivateRoute>
            },
            {
                path: 'recommendationsForMe',
                element: <PrivateRoute>
                    <RecommendationsForMe></RecommendationsForMe>
                </PrivateRoute>
            }
        ]
    },
    {
        path: "*",
        element: <Error />
    }

]);

export default router;