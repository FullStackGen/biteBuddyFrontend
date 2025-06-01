const RestaurantsListData = ({ restData }) => {
    console.log("restData", restData);

    return (
        <>
            <div className="px-8 my-8">
                <div className="text-2xl font-mono mb-12 text-center">Restaurant in Different States</div>
                <div className="grid grid-cols-12 mt-4 gap-8">
                    {
                        restData.map((data: any) => {
                            return (
                                <section key={data?.state} className="col-span-4 border border-b-cyan-950 outline-2 rounded py-4 px-2  transition-all transform hover:scale-110 cursor-pointer ease-snappy duration-300 hover:bg-blue-500 dark:hover:bg-blue-300 shadow-xl text-center">
                                    {data.state}
                                </section>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default RestaurantsListData;