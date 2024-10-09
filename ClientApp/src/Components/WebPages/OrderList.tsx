import { useAtom } from "jotai";
import { OrdersAtom } from "../../Atoms/OrdersAtom";
import useInitializedData from "../../useInitializedData";
function OrderList() {
    const [orders] = useAtom(OrdersAtom);

    useInitializedData();

    
    
    
    
    
    
    
    
    
    
    
    if (orders.length === 0) {
        return <div className="flex flex-col p-10">No orders available</div>;
    }

    const formatDate = (date: string | Date | undefined): string => {
        if (!date) return "Not available";
        const d = new Date(date);
        return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    };

    return (
        <div className="flex flex-col p-10">
            <h1 className="text-3xl font-bold mb-4">Orders</h1>
            {orders.map((order) => (
                <div key={order.id ?? Math.random()} className="bg-white rounded-lg p-4 shadow-lg mb-4">
                    <h2 className="text-2xl font-bold">Date of Order: {formatDate(order.orderDate)}</h2>
                    <p className="mt-2">Delivery Date: {formatDate(order.deliveryDate)}</p>
                    <p className="mt-2">Status: {order.status}</p>
                    <p className="mt-2">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                    
                    {order.customerId ? (
                        <p className="mt-2">Customer ID: {order.customerId}</p>
                    ) : (
                        <p className="mt-2 text-gray-500">Customer information not available</p>
                    )}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Order Items:</h3>
                        {order.orderEntries && order.orderEntries.length > 0 ? (
                            <ul className="mt-2">
                                {order.orderEntries.map((entry) => (
                                    <li key={entry.id} className="ml-4 list-disc">
                                        Product ID: {entry.productId}, Quantity: {entry.quantity}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-gray-500">No products available in this order.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderList;
