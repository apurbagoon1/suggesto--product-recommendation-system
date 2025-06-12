import {
    createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
]);

export default router;