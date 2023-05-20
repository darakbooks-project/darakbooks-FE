import { atom } from "recoil";

export const modalStateAtom = atom<boolean>({
    key:'modalState',
    default:false,
})