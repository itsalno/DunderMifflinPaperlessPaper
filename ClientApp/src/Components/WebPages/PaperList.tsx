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
        http.api.papersGetAllPapersList().then((response) => setPapers(response.data))
            .catch((error) => console.error("Error fetching papers:", error))
    }

    const handleSearch = () => {
        http.api.papersSearchList({ name: searchQuery }) // Pass as an object with 'name' property
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
        http.api.papersCreateCreate(paper)
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
        http.api.papersDeleteDelete(id)
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
        http.api.papersUpdateUpdate(id, updatedPaper)
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
        <div className="flex flex-col items-left justify-top h-screen p-10">
            <h1 className="text-3xl mb-5">PAPER LIST</h1>
            <div className="flex items-center mb-5">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                >
                    Search
                </button>
                <button onClick={reloadPapers}  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-3 ml-3">
                    Reset
                </button>
            </div>

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
                className="mb-5 p-2 border border-gray-300 rounded-md"
            >
                <option value="price">Sort by Price</option>
                <option value="stock">Sort by Stock</option>
                <option value="discount">Sort by Discount</option>
            </select>

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
                    <label className="block">
                        <span className="text-gray-700">Discontinued</span>
                        <input
                            type="checkbox"
                            checked={discontinued}
                            onChange={(e) => setDiscontinued(e.target.checked)}
                            className="mt-3 block w-full"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3"
                >
                    {paperId === null ? "Create" : "Update"}
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-3 ml-3"
                >
                    Reset
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full mt-5">
                {papers.map((paper) => (
                    <div
                        key={paper.id}
                        className="border border-gray-300 p-5 rounded-lg shadow-lg flex flex-col justify-between"
                    >
                        <h2 className="text-xl font-bold">{paper.name}</h2>
                        <p>Stock: {paper.stock}</p>
                        <p>Price: ${paper.price.toFixed(2)}</p>
                        <p>Discontinued: {paper.discontinued ? "Yes" : "No"}</p>
                        <div>
                            <h3 className="font-bold">Properties:</h3>
                            {paper.properties.length > 0 ? (
                                <ul>
                                    {paper.properties.map((property, idx) => (
                                        <li key={idx} className="text-sm text-gray-600">
                                            {property}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No properties available.</p>
                            )}
                        </div>
                        <button
                            onClick={() => handleEditClick(paper)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mt-3"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => DeletePaper(paper.id!)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-3 ml-3"
                        >
                            Delete
                        </button>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                className="border p-1 rounded"
                            />
                        </div>

                        <button onClick={() => addToCart(paper)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-3">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaperList;
