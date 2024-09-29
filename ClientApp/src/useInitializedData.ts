import { useEffect } from "react";
import { http } from "./http";
import { useAtom } from "jotai";
import { PapersAtom } from "./Atoms/PapersAtom";
import { OrdersAtom } from "./Atoms/OrdersAtom";


export function useInitializeData() {

    const [, setPapers] = useAtom(PapersAtom);
    const [,setOrders]=useAtom(OrdersAtom);


    useEffect(() => {
        http.api.papersList().then((response) => {
            setPapers(response.data);
        }).catch(e => {
            console.log(e)
        })
        http.api.ordersList().then((response) => {
            setOrders([response.data]);
        }).catch(e => {
            console.log(e)
        })
    }, [])
}
export default useInitializeData