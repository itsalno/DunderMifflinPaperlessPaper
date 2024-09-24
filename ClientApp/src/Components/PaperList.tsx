import {useEffect, useState } from "react";
import useInitializedData from "../useInitializedData";
import { useAtom } from "jotai";
import { PapersAtom } from "../Atoms/PapersAtom";
import { http } from "../http";
import toast from "react-hot-toast";
import { CreatePaperDto } from "../myApi";


function PaperList(){

    const [papers] = useAtom(PapersAtom);
    const [, setPapers] = useAtom(PapersAtom);


    useInitializedData();





    async function CreatePaper(Paper: CreatePaperDto) {
        http.api.papersAddPaperCreate(Paper).then(() => {
            setPapers([...papers, Paper]);
            toast.success('Paper created');
        }).catch(e => {
            console.log(e)
            toast.error('Issue creating paper');
        })

    }

    
    async function DeletePaper(id) {
        http.api.papersDeletePaperDelete(id).then(() => {
            toast.success('Paper deleted');
            setPapers(papers.filter(p => p.id !== id));
        }).catch(e => {
            console.log(e)
            toast.error('Issue deleting paper');
        })
        
    }

    
    async function UpdatePaper() {
        
    }
    

    

    return (
        <div className="flex items-left justify-top h-screen p-10">
            <h1 className="text-3xl mb-5">PAPER LIST</h1>

            <form onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.target as HTMLFormElement);
                const paper: CreatePaperDto = {
                    name: formData.get('name') as string,
                    stock: Number(formData.get('stock')),
                    price: parseFloat(formData.get('price') as string),
                    discontinued: formData.get('discontinued') !== null
                };

                CreatePaper(paper).then(() => {
                    (e.target as HTMLFormElement).reset();
                });
            }}>
                
                <h2 className="text-2xl font-bold mt-5">CREATE NEW PAPER</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full mt-5">
                    <label className="block">
                        <span className="text-gray-700">Name</span>
                        <input type="text" name="name" required
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Stock</span>
                        <input type="number" name="stock" required
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Price</span>
                        <input type="number" step="0.01" name="price" required
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </label>
                    <div className="col-span-1">
                        <input type="checkbox" name="discontinued" className="mr-2"/>
                        <span className="text-gray-700">Discontinued</span>
                    </div>
                </div>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">
                    Create
                </button>
            </form>

            
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