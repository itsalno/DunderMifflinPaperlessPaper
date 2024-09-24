import {useEffect, useState } from "react";
import useInitializedData from "../useInitializedData";
import { useAtom } from "jotai";
import { PapersAtom } from "../Atoms/PapersAtom";


function PaperList(){

    const [papers] = useAtom(PapersAtom);


    useInitializedData();





    return (
        <div className="flex items-left justify-top h-screen p-10">
            <h1 className="text-3xl mb-5">PAPER LIST</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
                {papers.map((paper) => (
                    <div key={paper.id} className="bg-white rounded-lg p-4 shadow-lg">
                        <h2 className="text-2xl font-bold">{paper.name}</h2>
                        <p className="mt-2">Stock: {paper.stock}</p>
                        <p className="mt-2">Price: {paper.price}</p>
                        <p className="mt-2">Discontinued: {paper.discontinued ? 'yes' : 'no'}</p>
                    </div>
                ))}
            </div>
        </div>
    );


}


export default PaperList