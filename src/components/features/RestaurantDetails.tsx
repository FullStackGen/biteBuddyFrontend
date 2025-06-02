import { useLocation } from "react-router";

const RestaurantDetails = () => {
    const routedData = useLocation();
    console.log("routedData.state", routedData.state);

    return (
        <>
            <div>
                Hello World
            </div>
            <div>
                Welcome Home Orders
            </div>
        </>
    )
}


export default RestaurantDetails;
