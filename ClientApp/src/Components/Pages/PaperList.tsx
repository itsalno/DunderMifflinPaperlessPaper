import { useState } from "react";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { CreatePaperDto, PaperDto } from "../../myApi";
import { PapersAtom } from "../../Atoms/PapersAtom";
import { http } from "../../http";
import useInitializedData from "../../useInitializedData";
import { CartAtom } from "../../Atoms/CartAtom";



function PaperList() {
    
    const [papers] = useAtom(PapersAtom);
    const [, setPapers] = useAtom(PapersAtom);
    const [, setCartItems] = useAtom(CartAtom);
    const [quantity, setQuantity] = useState<number>(1);
    
    
    const [paperId, setPaperId] = useState<number | null>(null); // Track if we're editing
    const [name, setName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [discontinued, setDiscontinued] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useInitializedData();
    
    

    const resetForm = () => {
        setPaperId(null);
        setName("");
        setStock(0);
        setPrice(0);
        setDiscontinued(false);
    };

    const addToCart = (paper) => {
        // Add paper and its quantity to the cart
        setCartItems((prevCart) => [...prevCart, { ...paper, quantity }]);
        toast.success(`${paper.name} added to cart!`);
    };
    
    
    const reloadPapers=()=>{
        http.api.getAllPapers().then((response) => setPapers(response.data))
            .catch((error) => console.error("Error fetching papers:", error))
    }

    const handleSearch = () => {
        http.api.papersSearch({ name: searchQuery }) // Pass as an object with 'name' property
            .then((response) => setPapers(response.data))
            .catch((error) => console.error("Error fetching searched papers:", error));
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
        http.api.papersCreate(paper)
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
        http.api.papersDelete(id)
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
        http.api.papersUpdate(id, updatedPaper)
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

    const fetchPapersByPrice = () => {
        http.api.papersSortByPriceList()
            .then((response) => setPapers(response.data))
            .catch((error) => console.error("Error fetching papers sorted by price:", error));
    };

    const fetchPapersByStock = () => {
        http.api.papersSortByStockList()
            .then((response) => setPapers(response.data))
            .catch((error) => console.error("Error fetching papers sorted by stock:", error));
    };

    const fetchPapersByDiscount = () => {
        http.api.papersSortByDiscountList()
            .then((response) => setPapers(response.data))
            .catch((error) => console.error("Error fetching papers sorted by discount:", error));
    };




    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-10">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-8">PRODUCTS</h1>
            
            <div className="flex flex-col items-center mb-8 w-full md:w-2/3 lg:w-1/2 space-y-4">
                <div className="flex space-x-4 w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name..."
                        className="p-3 w-full border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                        Search
                    </button>
                </div>
                <button
                    onClick={reloadPapers}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-all"
                >
                    Reset
                </button>
            </div>
            
            <div className="mb-8 w-full md:w-2/3 lg:w-1/2">
                <select
                    id="paperFilter"
                    onChange={(e) => {
                        switch (e.target.value) {
                            case "price":
                                fetchPapersByPrice();
                                break;
                            case "stock":
                                fetchPapersByStock();
                                break;
                            case "discount":
                                fetchPapersByDiscount();
                                break;
                            default:
                                fetchPapersByPrice();
                        }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="price">Sort by Price</option>
                    <option value="stock">Sort by Stock</option>
                    <option value="discount">Sort by Discount</option>
                </select>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-blue-500">
                    {paperId === null ? "Create New Paper" : "Update Paper"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                        <span className="text-gray-700">Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-2 focus:ring-indigo-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Stock</span>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            required
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-2 focus:ring-indigo-500"
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
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-2 focus:ring-indigo-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Discontinued</span>
                        <input
                            type="checkbox"
                            checked={discontinued}
                            onChange={(e) => setDiscontinued(e.target.checked)}
                            className="mt-3 block w-full rounded-lg border-gray-300 shadow focus:ring-2 focus:ring-indigo-500"
                        />
                    </label>
                </div>
                <div className="flex space-x-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                        {paperId === null ? "Create" : "Update"}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                        Reset
                    </button>
                </div>
            </form>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {papers.map((paper) => (
                    <div
                        key={paper.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{paper.name}</h2>
                        <p className="mt-2 text-gray-600">Stock: {paper.stock}</p>
                        <p className="text-gray-600">Price: ${paper.price.toFixed(2)}</p>
                        <p className="text-gray-600">Discontinued: {paper.discontinued ? "Yes" : "No"}</p>

                        <div className="mt-4">
                            <h3 className="font-bold text-gray-800">Properties:</h3>
                            {paper.properties.length > 0 ? (
                                <ul className="list-disc ml-5 mt-2 text-gray-600">
                                    {paper.properties.map((property, idx) => (
                                        <li key={idx} className="text-sm">
                                            {property}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No properties available.</p>
                            )}
                        </div>

                        <div className="flex space-x-3 mt-4">
                            <button
                                onClick={() => handleEditClick(paper)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => DeletePaper(paper.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                            >
                                Delete
                            </button>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-600">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                            />
                        </div>

                        <button
                            onClick={() => addToCart(paper)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full mt-4 transition-all"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaperList;
