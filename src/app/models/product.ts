export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string[];
    tag?: string[];
}

export const defaultProps: Partial<Product> = {
    category: ['Cabello', 'Maquillaje' , 'Manicura/Pedicura'],
    tag: ['Nuevo', 'Oferta', 'Más vendido', 'Exclusivo'],
};
