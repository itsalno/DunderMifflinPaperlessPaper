import {useEffect, useState } from "react";
import useInitializedData from "../useInitializedData";
import { useAtom } from "jotai";
import { PapersAtom } from "../Atoms/PapersAtom";
import { http } from "../http";
import toast from "react-hot-toast";


function PaperList(){

    const [papers] = useAtom(PapersAtom);
    const [, setPapers] = useAtom(PapersAtom);


    useInitializedData();





    async function CreatePaper() {

    }

    
    async function DeletePaper(id) {
        http.api.papersDeletePaperDelete(id).then(() => {
            toast.success('Paper deleted');
            setPapers(papers.filter(p => p.id !== id));
        }).catch(e => {
            console.log(e)
        })
        
    }

    
    async function UpdatePaper() {
        
    }
    

    

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
                        <button onClick={() => DeletePaper(paper.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2">Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}


export default PaperList