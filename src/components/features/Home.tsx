import { useRef, useState } from "react";
import searchIcon from "../../assets/search.svg"

const Home = () => {

    const searchValue = useRef<HTMLInputElement>(null)
    // const searchValue = useRef<string>("")
    // const [searchQuery, setSearchQuery] = useState<string>("");

    const searchRestaurant = (event: any) => {
        if (event) {
            event.preventDefault();
        }
        console.log("search vakue", searchValue.current?.value);
    }


    return (
        <>
            <div className="m-14 p-14">
                <p className="text-base">BiteBuddy: Serving Up Code & Cuisine”</p>
                <h1 className="neon text-4xl font-bold">Welcome to BiteBuddy!</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-cyan-100">
                    Discover and search thousands of local restaurants.
                </p>
                <section className="flex items-center mt-20">
                    <section onSubmit={searchRestaurant} className="absolute">
                        <form>
                            <input ref={searchValue} type="text" placeholder="Search for a restaurant…" className="w-2xl h-14 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-800" />
                        </form>
                        <button onClick={searchRestaurant} type="submit" className="absolute right-2 top-2 bg-inherit text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
                            <img className="w-5 h-5" alt="search" src={searchIcon} />
                        </button>
                    </section>

                </section>
            </div>

            {/* <section className="flex items-center p-8 mt-4">
                <form onSubmit={searchRestaurant}>
                    <input type="text" className="w-16 h-10"/>
                </form>
            </section> */}

        </>
    )
}


export default Home;
