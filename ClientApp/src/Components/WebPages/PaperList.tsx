import { useState } from "react";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { CreatePaperDto, PaperDto } from "../../myApi";
import { PapersAtom } from "../../Atoms/PapersAtom";
import { http } from "../../http";
import useInitializedData from "../../useInitializedData";



function PaperList() {
    
    const [papers] = useAtom(PapersAtom);
    const [, setPapers] = useAtom(PapersAtom);
    const [paperId, setPaperId] = useState<number | null>(null); // Track if we're editing
    const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
    const [name, setName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [discontinued, setDiscontinued] = useState(false);

    useInitializedData();
    
    

    const resetForm = () => {
        setPaperId(null);
        setName("");
        setStock(0);
        setPrice(0);
        setDiscontinued(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const paper: CreatePaperDto = {
            name,
            stock,
            price,
            discontinued,
        };

        if (paperId === null) {
            CreatePaper(paper);
        } else {
            UpdatePaper(paperId, { ...paper, id: paperId });
        }
    };

    async function CreatePaper(paper: CreatePaperDto) {
        http.api.papersAddPaperCreate(paper)
            .then(() => {
                setPapers([...papers, paper]);
                toast.success("Paper created");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Issue creating paper");
            });
    }

    async function DeletePaper(id: number) {
        http.api.papersDeletePaperDelete(id)
            .then(() => {
                toast.success("Paper deleted");
                setPapers(papers.filter((p) => p.id !== id));
            })
            .catch((e) => {
                console.log(e);
                toast.error("Issue deleting paper");
            });
    }

    async function UpdatePaper(id: number, updatedPaper: PaperDto) {
        http.api.papersUpdatePaperUpdate(id, updatedPaper)
            .then(() => {
                setPapers(
                    papers.map((paper) =>
                        paper.id === id ? { ...paper, ...updatedPaper } : paper
                    )
                );
                toast.success("Paper updated");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Issue updating paper");
            });
    }

    const handleEditClick = (paper: PaperDto) => {
        if (paper.id) { 
            setPaperId(paper.id);
            setName(paper.name);
            setStock(paper.stock);
            setPrice(paper.price);
            setDiscontinued(paper.discontinued);
        }
    };

    return (
        <div className="flex items-left justify-top h-screen p-10">
            <h1 className="text-3xl mb-5">PAPER LIST</h1>

            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mt-5">
                    {paperId === null ? "CREATE NEW PAPER" : "UPDATE PAPER"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full mt-5">
                    <label className="block">
                        <span className="text-gray-700">Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Stock</span>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Price</span>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <div className="col-span-1">
                        <input
                            type="checkbox"
                            checked={discontinued}
                            onChange={(e) => setDiscontinued(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-gray-700">Discontinued</span>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                >
                    {paperId === null ? "Create" : "Update"}
                </button>
                {paperId !== null && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-4"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full mt-5">
                {papers.map((paper) => (
                    <div key={paper.id ?? Math.random()} className="bg-white rounded-lg p-4 shadow-lg">
                        <h2 className="text-2xl font-bold">{paper.name}</h2>
                        <p className="mt-2">Stock: {paper.stock}</p>
                        <p className="mt-2">Price: {paper.price}</p>
                        <p className="mt-2">
                            Discontinued: {paper.discontinued ? "Yes" : "No"}
                        </p>
                        
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={() => handleEditClick(paper)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => DeletePaper(paper.id!)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaperList;
