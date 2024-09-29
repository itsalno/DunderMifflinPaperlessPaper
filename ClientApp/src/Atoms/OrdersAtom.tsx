import {atom} from "jotai/index";
import { Order } from "../myApi";

export const OrdersAtom = atom<Order[]>([]);