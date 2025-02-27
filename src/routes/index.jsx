
import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout";
import Answers from "../pages/Answers";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Register from "../pages/Resgister";
import Result from "../pages/Result";
import Topic from "../pages/Topic";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                element: <PrivateRoutes />,
                children: [{
                    path: "topic",
                    element: <Topic />
                }, {
                    path: "answers",
                    element: <Answers />
                },
                {
                    path: "quiz",
                    element: <Quiz />
                },
                {
                    path: "result",
                    element: <Result />
                },
                ]
            },
            {
                path: "*",
                element: <Error404 />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    }
]