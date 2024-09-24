import { atom } from "jotai";
import { PaperDto } from "../myApi";

export const PapersAtom = atom<PaperDto[]>([]);