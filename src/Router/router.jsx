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

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:5000/queries'),
                Component: Home
            },
            {
                path: '/allQueries',
                Component: AllQueries

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
]);

export default router;