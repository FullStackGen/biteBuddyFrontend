import { useState, useEffect } from "react";
import darkModeIcon from "./assets/dark-mode.svg"
import lightModeIcon from "./assets/light-mode.svg"
import defaultAvatar from "./assets/default-user-avatar.svg";


function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <main>
      <header className="flex items-center justify-between p-4 mx-8 mt-4">
        <div>
          <h1 className="text-3xl font-bold text-shadow-2xs leading-4">BiteBuddy</h1>
        </div>

        <div className="flex justify-between items-center gap-8 space-x-4">
          <section>
            <button className="text-lg font-mono font-medium italic cursor-pointer">
              Add new Restaurant / Dishes
            </button>
          </section>
          <section>
            <button className="text-lg font-mono font-medium italic cursor-pointer">
              Contact Us
            </button>
          </section>
          <section>
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="shadow-md p-3 border border-transparent rounded-full outline-none bg-white hover:bg-gray-100   transition-all hover:duration-500 transform hover:scale-110 hover:rotate-12 hover:drop-shadow-lg   dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
            >
              <img
                className="w-7 h-7"
                alt="toggle-theme"
                src={theme === "dark" ? darkModeIcon : lightModeIcon}
                loading="lazy"
              />
            </button>
          </section>
          <section className="border border-transparent p-4 rounded-full dark:shadow-sm shadow-md shadow-amber-300 bg-amber-200 transition-all transform hover:scale-120 cursor-pointer ease-snappy duration-300">
            <img className="w-7 h-7" alt="User-Avatar" src={defaultAvatar} loading="lazy" />
          </section>
        </div>
      </header>
    </main>
  );
}

export default App;
