import { useState, useEffect, use } from "react";

import darkModeIcon from "../../assets/dark-mode.svg"
import lightModeIcon from "../../assets/light-mode.svg"
import defaultAvatar from "../../assets/default-user-avatar.svg";
import searchIcon from "../../assets/search.svg";

import { dashboardComponentButtons, SignUpFormData } from "../../constants/ui-constants";
import { Theme, ButtonsData } from "../../types/customTypes";
import { useLocation, useNavigate } from "react-router";
import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from "@mui/material";

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);
    const [loginFormData, setLoginFormData] = useState<any>([]);
    const [formType, setFormType] = useState<string>("signup");
    const materialTheme = useTheme();
    const fullScreen = useMediaQuery(materialTheme.breakpoints.down("md"));
    const buttonsSectionDetails: ButtonsData[] = dashboardComponentButtons;


    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        setLoginFormData(SignUpFormData);
    }, [])


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    const routeToPage = (route: string) => {
        navigate(route);
    }

    return (
        <main className="shadow-lg shadow-gray-300 drop-shadow-2xl border border-b border-cyan-100 bg-blue-100 dark:bg-blue-900  z-10">
            <header className="flex items-center justify-between p-4 m-4">
                <div>
                    <h1 className="text-3xl font-bold text-shadow-2xs leading-4">BiteBuddy</h1>
                </div>

                <div className="flex justify-between items-center gap-2 space-x-4">

                    {buttonsSectionDetails.map(({ id, name, route }) => {
                        const isActive = pathname === route;
                        return (
                            <section key={id} id={id}>
                                <button onClick={() => routeToPage(route)} className={`text-lg font-mono font-medium italic cursor-pointer 
                                        ${isActive ? "bg-blue-600 text-white" : "bg-transparent hover:bg-blue-100"}`}>
                                    {name}
                                </button>
                            </section>
                        )
                    })}


                    <section>
                        <button onClick={() => setOpen(true)} className="text-lg font-mono font-medium italic cursor-pointer">
                            Login / Sign Up
                        </button>
                    </section>

                    <section className="border border-transparent p-3 rounded-full dark:shadow-sm shadow-md shadow-amber-300 bg-amber-200 transition-all transform hover:scale-120 cursor-pointer ease-snappy duration-300">
                        <img className="w-5 h-5" alt="User-Avatar" src={defaultAvatar} loading="lazy" />
                    </section>

                    <section>
                        <button
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                            className="shadow-md p-3 border border-transparent rounded-full outline-none bg-white hover:bg-gray-100   transition-all hover:duration-500 transform hover:scale-110 hover:rotate-12 hover:drop-shadow-lg   dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
                        >
                            <img
                                className="w-3 h-3"
                                alt="toggle-theme"
                                src={theme === "dark" ? darkModeIcon : lightModeIcon}
                                loading="lazy"
                            />
                        </button>
                    </section>

                    {/* <section>
              <button
                aria-label="Toggle search"
                onClick={toggleTheme}
                className="shadow-md p-3 border border-transparent rounded-full outline-none bg-white hover:bg-gray-100   transition-all hover:duration-500 transform hover:scale-110 hover:rotate-12 hover:drop-shadow-lg   dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
              >
                <img
                  className="w-3 h-3"
                  alt="toggle-search"
                  src={searchIcon}
                  loading="lazy"
                />
              </button>
            </section> */}


                    {/* <section className="border border-transparent p-3 rounded-full dark:shadow-sm shadow-md shadow-amber-300 bg-amber-200 transition-all transform hover:scale-120 cursor-pointer ease-snappy duration-300">
              <img className="w-5 h-5" alt="User-Avatar" src={defaultAvatar} loading="lazy" />
            </section> */}

                </div>
            </header>

            <Dialog
                fullScreen={fullScreen}

                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="login-signup-dialog-title">
                    Login / Sign Up
                </DialogTitle>
                <DialogContent>
                    {(!loginFormData || loginFormData?.length === 0) ? null : (
                        loginFormData?.map((item) => (
                            <section key={item?.id} className="m-2">
                                <label>{item?.label}</label>
                                <input type={item?.type} className="w-full border rounded-lg p-4 outline-0 leading-4" />

                            </section>
                        ))
                    )}
                </DialogContent>

            </Dialog>
        </main >

    );
}

export default Header;
