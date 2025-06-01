import { useEffect, useState } from "react"

const useRestaurantData = () => {
    const [restaurantList,setRestaurantList] =  useState([]); 
    const [stateWiseData,setStateWiseData] = useState([]);

    useEffect(()=>{
        getRestaurantData()
    },[])

    async function getRestaurantData()  {
      const apiData = await fetch('/data/restaurantMockData.json');
    //   const data = await apiData.json();
      console.log("data",apiData);
      const data = await apiData.json()

    const filteredData =  data?.restaurantData?.reduce((acc,curr)=>{
        console.log("acc",acc);
        console.log("curr",curr);
        console.log(curr?.State);
        
        console.log(acc?.find((foData:any)=> foData?.state?.toUpperCase() === curr?.State?.toUpperCase()));
        const isFound = acc?.find((foData:any)=> foData?.state?.toUpperCase() === curr?.State?.toUpperCase())
        
        if(isFound){
                isFound?.data.push(curr);
        } else {
            acc?.push({
                state: curr?.State,
                data: [curr]
            })
        }
        return acc;
      },[]);

      console.log("filteredData",filteredData);
      
      console.log("Data",data?.restaurantData);
      setRestaurantList(data?.restaurantData);
      setStateWiseData(filteredData);
    }

    return [restaurantList,stateWiseData];
}

export default useRestaurantData;