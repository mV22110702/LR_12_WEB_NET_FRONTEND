import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getKeyByValue<T extends { [K: string]: any }>(object: T, value: any) {
    return Object.keys(object).find(key => object[key] === value);
}
