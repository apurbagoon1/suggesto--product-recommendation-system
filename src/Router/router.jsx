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
            }
        ]
    },
]);

export default router;