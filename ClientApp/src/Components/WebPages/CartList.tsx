import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom";
import toast from "react-hot-toast";
import { useState } from "react";
import { http } from "../../http";

function CartList() {
    
    const [cartItems] = useAtom(CartAtom);
    const [status, setStatus] = useState<string>("pending"); 
    const [customerId, setCustomerId] = useState<number | null>(null);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderDate=Date.now().toString()
    const deliveryDate=Date.now().toString()

    
    
    const handleCreateOrder = async () => {
       
        if (!deliveryDate) {
            toast.error("Delivery date is required.");
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
        <div className="flex flex-col p-10">
            <h1 className="text-3xl mb-5">Cart Items</h1>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index} className="border p-3 mb-3 rounded shadow">
                            <p>Name: {item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <h2 className="text-2xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>

                    <div className="mt-5">

                        <label className="block mt-3">
                            <span>Customer ID:</span>
                            <input
                                type="number"
                                value={customerId || ""} // Display customer ID or empty if null
                                onChange={(e) => setCustomerId(Number(e.target.value))}
                                placeholder="Optional"
                                className="p-2 border rounded mt-1"
                            />
                        </label>

                        <button
                            onClick={handleCreateOrder} // Trigger order creation
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3"
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
