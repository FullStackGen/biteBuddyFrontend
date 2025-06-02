import { useRef, useState } from "react";
import searchIcon from "../../assets/search.svg";
import useRestaurantData from "../../hooks/restaurantData";
import RestaurantsListData from "./RestaurantsData";

const Home = () => {
    const [restaurantList, stateWiseFilteredData] = useRestaurantData();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const searchValueRef = useRef<HTMLInputElement>(null);

    const searchRestaurant = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchQuery(searchValueRef.current?.value || "");
        console.log("search value (in Home):", searchValueRef.current?.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
        if (searchValueRef.current) {
            searchValueRef.current.value = "";
            searchValueRef.current.focus();
        }
    }

    return (
        <>
            <div className="m-14 p-14">
                <p className="text-base">BiteBuddy: Serving Up Code &amp; Cuisine</p>
                <h1 className="neon text-4xl font-bold">Welcome to BiteBuddy!</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-cyan-100">
                    Discover and search thousands of local restaurants.
                </p>

                {/* Search form */}
                <section className="flex items-center mt-20">
                    <form onSubmit={searchRestaurant} className="relative">
                        <input
                            ref={searchValueRef}
                            type="text"
                            placeholder="Search for a restaurant…"
                            className="w-2xl h-14 p-4 border border-gray-300 dark:border-gray-600
                         rounded-xl focus:outline-none focus:ring-2
                         focus:ring-offset-1 focus:ring-offset-white
                         dark:focus:ring-offset-gray-800"
                        />
                        <button
                            type={searchQuery.length ? "button" : "submit"}
                            onClick={searchQuery.length ? clearSearch : undefined}
                            className="absolute right-2 top-2 bg-inherit text-white
                         px-4 py-2 rounded-lg hover:bg-blue-700
                         transition duration-300 cursor-pointer"
                        >
                            {searchQuery && searchQuery.length ? <span className="text-black dark:text-blue-400">X</span> : <img className="w-5 h-5" alt="search" src={searchIcon} />}
                        </button>
                    </form>
                </section>
            </div>

            {!restaurantList.length || !stateWiseFilteredData.length ? (
                <div>Loading…</div>
            ) : (
                <RestaurantsListData
                    restData={stateWiseFilteredData}
                    searchValue={searchQuery}
                />
            )}
        </>
    );
};

export default Home;
