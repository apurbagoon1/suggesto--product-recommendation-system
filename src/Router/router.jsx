import {
    createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AddQuery from "../Pages/AddQuery";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                loader: ()=> fetch('http://localhost:5000/queries'),
                Component: Home
            },
            {
                path: 'addQuery',
                Component: AddQuery
            }
        ]
    },
]);

export default router;