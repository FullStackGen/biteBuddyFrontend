const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <>
            <section className="grid grid-cols-12 items-center justify-center p-8 shadow-2xl drop-shadow-2xl z-10 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <div className="col-span-6">
                    <div>
                        <h1 className="text-3xl font-bold text-shadow-2xs leading-4">BiteBuddy</h1>
                    </div>
                </div>
                <section className="flex flex-col gap-8 items-end justify-end col-span-6 ">
                    <div className="cursor-pointer">Contact Us</div>
                    <div className="cursor-pointer">About Us</div>
                    <div className="cursor-pointer">Add New Restaurant</div>
                    <div className="cursor-pointer">Help</div>
                    <button onClick={scrollToTop} className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                        ↑ Back to top
                    </button>

                </section>
            </section>
        </>
    )
}

export default Footer;