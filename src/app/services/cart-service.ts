import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from '../models/cartItem';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());

  cartItems$ = this.cartItems.asObservable();
  total$ = this.cartItems$.pipe(map(items => items.reduce((acc, item) => acc + item.subtotal, 0)));
  itemCount$ = this.cartItems$.pipe(map(items => items.reduce((acc, item) => acc + item.quantity, 0)));

  addItem(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        subtotal: product.price,
      };
      currentItems.push(newItem);
    }
    this.updateCart(currentItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.getValue();
    const itemToUpdate = currentItems.find(item => item.productId === productId);

    if (itemToUpdate) {
      if (quantity > 0) {
        itemToUpdate.quantity = quantity;
        itemToUpdate.subtotal = itemToUpdate.quantity * itemToUpdate.price;
      } else {
        this.removeItem(productId);
        return;
      }
    }
    this.updateCart(currentItems);
  }

  removeItem(productId: number): void {
    const updatedItems = this.cartItems.getValue().filter(item => item.productId !== productId);
    this.updateCart(updatedItems);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.saveCartToStorage(items);
  }

  private saveCartToStorage(items: CartItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('beautyCatalogCart', JSON.stringify(items));
    }
  }

  private getCartFromStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
      const cart = localStorage.getItem('beautyCatalogCart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }
}
