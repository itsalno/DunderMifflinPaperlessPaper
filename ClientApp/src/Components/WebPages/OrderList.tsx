import { useAtom } from "jotai";
import { OrdersAtom } from "../../Atoms/OrdersAtom";
import useInitializedData from "../../useInitializedData";
function OrderList() {
    const [orders] = useAtom(OrdersAtom);

    useInitializedData();

    
    
    
    
    
    
    
    
    
    
    
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
                    <p className="mt-2 text-gray-600">Status:
                        <span className={`ml-2 px-2 py-1 rounded-full text-white ${
                            order.status === 'Delivered' ? 'bg-green-500' :
                                order.status === 'Pending' ? 'bg-yellow-500' :
                                    'bg-red-500'
                        }`}>
                            {order.status}
                        </span>
                    </p>
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
