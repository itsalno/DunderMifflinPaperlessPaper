import { useEffect } from "react";
import { http } from "./http";
import { useAtom } from "jotai";
import { PapersAtom } from "./Atoms/PapersAtom";


export function useInitializeData() {

    const [, setPapers] = useAtom(PapersAtom);


    useEffect(() => {
        http.api.papersList().then((response) => {
            setPapers(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])
}
export default useInitializeData