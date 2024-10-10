import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom";
import toast from "react-hot-toast";
import { useState } from "react";
import { http } from "../../http";
import { CustomersAtom } from "../../Atoms/CustomerAtom";
import useInitializedData from "../../useInitializedData";

function CartList() {
    
    const [cartItems] = useAtom(CartAtom);
    const [customers]=useAtom(CustomersAtom);
    const [status, setStatus] = useState<string>("pending"); 
    const [customerId, setCustomerId] = useState<number | null>(null);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderDate=Date.now().toString()
    const deliveryDate=Date.now().toString()

    
    
    useInitializedData();
    
    
    
    
    const handleCreateOrder = async () => {
       
        if (!customerId) {
            toast.error("Customer id is required.");
            return;
        }

        
        const createOrderDto = {
            orderDate: orderDate, 
            deliveryDate: deliveryDate, 
            status: status, 
            totalAmount: totalAmount,
            customerId: customerId,
            orderEntries: cartItems.map((item) => ({
                productId: item.id, 
                quantity: item.quantity,
            })),
        };

        console.log("Creating order with data:", createOrderDto); 

        try {
            const response = await http.api.ordersCreate(createOrderDto);
            toast.success("Order created successfully!"); 
            console.log("Order created:", response); 
        } catch (error) {
            console.error("Error creating order:", error); 
            toast.error("Failed to create order. Please check the input fields."); 
        }
    };

    return (
        <div className="flex flex-col p-10 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-xl text-gray-600">No items in your cart. Add something!</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-xl border-t-4 border-blue-500"
                            >
                                <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                </div>
                                <p className="mt-3 text-lg font-semibold text-gray-800">
                                    Total: ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-xl">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">Total Amount</h2>
                        <p className="text-2xl font-semibold text-gray-800 mb-6">${totalAmount.toFixed(2)}</p>

                        <div className="mb-6">
                            <label className="block mb-3 text-lg font-semibold text-gray-700">
                                Select Customer:
                            </label>
                            <select
                                value={customerId || ""}
                                onChange={(e) => setCustomerId(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option value="">Choose a customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleCreateOrder}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Create Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartList;
