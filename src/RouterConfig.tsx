import Home from "./components/features/Home"
import AddRestaurant from "./components/features/AddRestaurant"
import Orders from "./components/features/Orders"
import Help from "./components/features/Help"
import NotFound from "./components/features/NotFound"
import { dashboardComponentButtons } from "./constants/ui-constants"
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RestaurantDetails from "./components/features/RestaurantDetails"

// map the string key → actual React component
const componentMap: Record<string, React.ComponentType> = {
    Home,
    AddRestaurant,
    RestaurantDetails,
    Orders,
    Help,
    NotFound
}

export const router = createBrowserRouter([
    {
        element: <App />,      // your layout: renders <Header/> + <Outlet/>
        children: [
            // for each button config, create a matching route
            ...dashboardComponentButtons.map(({ id, route, component }) => {
                const Page = componentMap[component]
                return {
                    path: route,
                    element: <Page />,
                    // you can also pass id/key in loader/context if needed 
                }
            }),

            // fallback 404
            { path: "*", element: <NotFound /> },
        ],
    },
])