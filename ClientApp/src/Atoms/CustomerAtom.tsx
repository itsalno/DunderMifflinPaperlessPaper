import {atom} from "jotai/index";
import { Customer } from "../myApi";

export const CustomersAtom = atom<Customer[]>([]);