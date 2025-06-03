import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import searchIcon from "../../assets/search.svg";
import useRestaurantData from "../../hooks/restaurantData";
import RestaurantsListData from "./RestaurantsData";

gsap.registerPlugin(TextPlugin);

const Home: React.FC = () => {
    const [restaurantList, stateWiseFilteredData] = useRestaurantData();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const searchValueRef = useRef<HTMLInputElement>(null);

    // Refs for the two lines we'll scramble
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!headingRef.current || !subTextRef.current) return;

        // Create a single timeline so we can sequence both scrambles
        const tl = gsap.timeline();

        // Clear both elements so TextPlugin has a blank slate
        tl.set(headingRef.current, { textContent: "" });
        tl.set(subTextRef.current, { textContent: "" });

        // Animate the <h1> scramble-in
        const headingVars: any = {
            duration: 1.2,
            ease: "power1.out",
            text: {
                value: "Welcome to BiteBuddy!",
                scrambleText: {
                    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    revealDelay: 0.3,
                    speed: 0.2,

                },
            },
        };
        tl.to(headingRef.current, headingVars);

        // Animate the paragraph scramble-in, overlapping by 0.8s
        const subTextVars = {
            duration: 1.6,
            ease: "power1.out",

            text: {
                value: "Discover and search thousands of local restaurants.",
                scrambleText: {
                    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    revealDelay: 0.5,
                    speed: 0.3
                },
            },
        };
        tl.to(subTextRef.current, subTextVars, "-=0.8");

        return () => {
            tl.kill();
        };
    }, []);

    const searchRestaurant = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchQuery(searchValueRef.current?.value || "");
    };

    const clearSearch = () => {
        setSearchQuery("");
        if (searchValueRef.current) {
            searchValueRef.current.value = "";
            searchValueRef.current.focus();
        }
    };

    return (
        <>
            <div className="m-14 p-14">
                <p className="text-base">BiteBuddy: Serving Up Code &amp; Cuisine</p>

                {/* Both elements start empty so GSAP can scramble them in */}
                <h1 ref={headingRef} className="text-4xl font-bold"></h1>
                <p ref={subTextRef} className="mt-2 text-lg text-gray-600 dark:text-cyan-100"></p>

                {/* Search form */}
                <section className="flex items-center mt-20">
                    <form onSubmit={searchRestaurant} className="relative">
                        <input
                            ref={searchValueRef}
                            type="text"
                            placeholder="Search for a restaurant…"
                            className="w-2xl h-14 p-4 border border-gray-300 dark:border-gray-600 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white
                         dark:focus:ring-offset-gray-800"
                        />
                        <button
                            type={searchQuery.length ? "button" : "submit"}
                            onClick={searchQuery.length ? clearSearch : undefined}
                            className="absolute right-2 top-2 bg-inherit text-white px-4 py-2 rounded-lg
                         hover:bg-blue-700 transition duration-300 cursor-pointer"
                        >
                            {searchQuery.length ? (
                                <span className="text-black dark:text-blue-400">X</span>
                            ) : (
                                <img className="w-5 h-5" alt="search" src={searchIcon} />
                            )}
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