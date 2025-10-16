export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string[];
    tags?: string[];
}

export const defaultProps: Partial<Product> = {
    category: ['Cabello', 'Maquillaje' , 'Manicura/Pedicura'],
    tags: ['Nuevo', 'Oferta', 'Más vendido', 'Exclusivo'],
};
