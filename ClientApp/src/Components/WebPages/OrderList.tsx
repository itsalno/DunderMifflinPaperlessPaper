import { useAtom } from "jotai";
import { OrdersAtom } from "../../Atoms/OrdersAtom";
import useInitializedData from "../../useInitializedData";
import { useState } from "react";
import toast from "react-hot-toast";
import { http } from "../../http";
function OrderList() {
    const [orders,setOrders] = useAtom(OrdersAtom);
    const [editOrderId, setEditOrderId] = useState<number | null>(null); 
    const [newStatus, setNewStatus] = useState<string>("");

    useInitializedData();






    const handleStatusUpdate = async (orderId: number) => {
        if (!newStatus) {
            toast.error("Please select a new status.");
            return;
        }

        const orderToUpdate = orders.find((order) => order.id === orderId);
        if (!orderToUpdate) {
            toast.error("Order not found.");
            return;
        }
        
        const updatedOrder = {
            ...orderToUpdate,
            status: newStatus,
            orderDate: orderToUpdate.orderDate,
            deliveryDate: orderToUpdate.deliveryDate
        };

        try {
            const updatedOrders = orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
            
            await http.api.ordersUpdateUpdate(orderId, updatedOrder);
            toast.success("Order status updated successfully!");
            setEditOrderId(null);
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status. Please try again.");
        }
    };
    
    
    
    
    
    if (orders.length === 0) {
        return <div className="flex flex-col p-10">No orders available</div>;
    }



    return (
        <div className="flex flex-col p-10 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-8">Your Orders</h1>

            {orders.map((order) => (
                <div
                    key={order.id ?? Math.random()}
                    className="bg-white rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 mb-6 border-t-4 border-indigo-500"
                >
                    <h2 className="text-2xl font-bold text-gray-800">Order Date: {order.orderDate}</h2>
                    <p className="mt-2 text-gray-600">Delivery Date: {order.deliveryDate}</p>
                    
                    {editOrderId === order.id ? (
                        <div className="mt-2">
                            <label className="block text-gray-700">Change Status:</label>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="mt-1 p-2 border rounded-lg w-full"
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button
                                onClick={() => handleStatusUpdate(order.id)}
                                className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Save Status
                            </button>
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-600">
                            Status:
                            <span className={`ml-2 px-2 py-1 rounded-full text-white ${
                                order.status === 'Delivered' ? 'bg-green-500' :
                                    order.status === 'Shipped' ? 'bg-blue-500' :
                                        order.status === 'Pending' ? 'bg-yellow-500' :
                                            'bg-red-500'
                            }`}>
                                {order.status}
                            </span>
                        </p>
                    )}

                    {/* Edit status button */}
                    <button
                        onClick={() => setEditOrderId(order.id)}
                        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Edit Status
                    </button>

                    <p className="mt-2 text-xl font-semibold text-gray-800">Total Amount: ${order.totalAmount.toFixed(2)}</p>

                    {order.customerId ? (
                        <p className="mt-2 text-gray-600">Customer ID: {order.customerId}</p>
                    ) : (
                        <p className="mt-2 text-gray-500 italic">Customer information not available</p>
                    )}

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700">Order Items</h3>
                        {order.orderEntries && order.orderEntries.length > 0 ? (
                            <ul className="mt-4 space-y-2">
                                {order.orderEntries.map((entry) => (
                                    <li key={entry.id} className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11.414l3.707-3.707-1.414-1.414L11 9.586 8.707 7.293l-1.414 1.414L11 13.414z" />
                                        </svg>
                                        Product ID: {entry.productId}, Quantity: {entry.quantity}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 text-gray-500">No products available in this order.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderList;
