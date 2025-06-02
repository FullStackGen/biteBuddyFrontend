import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface RestaurantGroup {
    state: string;
    data: any[];
}

interface Props {
    restData: RestaurantGroup[];
    searchValue: string;
}

const RestaurantsListData = ({ restData, searchValue }: Props) => {
    console.log("restData", restData);
    const [restaurantData, setRestaurantData] = useState(restData);
    const navigate = useNavigate();

    useEffect(() => {
        setRestaurantData(restData);
    }, [restData]);


    useEffect(() => {
        console.log("Search value in RestaurantsListData:", searchValue);
        if (!searchValue) {
            setRestaurantData(restData);
            return;
        }

        // You can filter restData here if needed, e.g.:
        const filtered = restData.filter(group =>
            group.state.toLowerCase() === searchValue.toLowerCase()
        );

        console.log("filtered", filtered)
        setRestaurantData(filtered);

    }, [searchValue]);

    const navigateToRestaurantDetails = (state: string, data: RestaurantGroup) => {
        console.log("gfgdfgdfgdf", data);
        navigate("/restaurant", { state: { searchKey: state, filteredData: data, originalData: restData } });

    }


    return (
        <div className="px-8 my-8">
            {searchValue && searchValue?.length && restaurantData && restaurantData.length ? (
                <div className="text-2xl font-mono mb-12 text-center">
                    Restaurant are available in {searchValue} . Do you want to check it out?
                </div>
            ) : null}
            {searchValue && searchValue?.length && (!restaurantData || restaurantData.length === 0) ? (
                <div className="text-2xl font-mono mb-12 text-center">
                    No Restaurant are Currently available for the Serached region
                </div>
            ) : null}
            {(!searchValue || searchValue?.length === 0) && restaurantData && restaurantData.length ? (
                <div className="text-2xl font-mono mb-12 text-center">
                    Restaurant in Different States :
                </div>
            ) : null}

            <div className="grid grid-cols-12 mt-4 gap-8">
                {restaurantData && restaurantData.length ? restaurantData.map((data) => (
                    <section
                        onClick={() => navigateToRestaurantDetails(data.state, data)}
                        key={data.state}
                        className="col-span-4 border border-b-cyan-950 outline-2 rounded
                       py-4 px-2 transition-all transform hover:scale-110
                       cursor-pointer ease-snappy duration-300 hover:bg-blue-500
                       dark:hover:bg-blue-300 shadow-xl text-center"
                    >
                        {data.state}
                    </section>
                )) : null}
            </div>
        </div>
    );
};

export default RestaurantsListData;
