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