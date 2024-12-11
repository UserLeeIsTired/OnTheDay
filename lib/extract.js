import { useState, useEffect } from "react";

const getData = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await fn();
            setData(response);
        }catch (error){
            Alert.alert('Error', error.message);
        }finally{
            setIsLoading(false); 
        }
        }
        fetchData();
    },[]);

    const refetch = async () => {
        fetchData();
    }
    return { data, isLoading, refetch }
}

export default getData;

