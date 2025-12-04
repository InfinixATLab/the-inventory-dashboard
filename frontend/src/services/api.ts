import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    in_stock: boolean;
    category?: number;      
    category_name?: string; 
}