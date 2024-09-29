import {useAtom} from "jotai/index";
import { OrdersAtom } from "../Atoms/OrdersAtom";

function OrderList() {

    const [orders] = useAtom(OrdersAtom);
    const [, setOrders] = useAtom(OrdersAtom);
    
    
    
    
    
    
    
    
    
    
    return (
        <div className="flex flex-col p-10">
            Orders
            {orders.map((order) => (
                <div key={order.id ?? Math.random()} className="bg-white rounded-lg p-4 shadow-lg">
                    <h2 className="text-2xl font-bold">Date of order:{order.orderDate}</h2>
                    <p className="mt-2">Delivery Date: {order.deliveryDate ? order.deliveryDate.toString() : 'Not available'}</p>
                    <p className="mt-2">Status: {order.status}</p>
                    <p className="mt-2">Total: {order.totalAmount}</p>
                    <p className="mt-2">Price: {order.customerId}</p>

                </div>
            ))}
                <div/>
        </div>
    );
}
    
export default OrderList;