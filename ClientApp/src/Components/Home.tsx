import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useInitializeData} from "../useInitializeData.ts";
import {http} from '../http.ts';
export default function Home() {
    
    function f() {
        http.api.
    }

    //const [, setProducts] = useAtom(PatientsAtom);

    //useEffect(() => {

   // },[])

    //useInitializeData();

    return (
        <div className="flex items-center justify-center h-screen mt-20">
        <div className="flex items-top justify-center h-screen">
            <h1 className="menu-title text-7xl m-5">DUNDER MIFFLIN</h1>
            <p className="text-2xl m-5">Limitless Paper in Paperless World</p>
        </div>
        </div>
    );
}