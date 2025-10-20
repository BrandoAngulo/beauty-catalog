import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
   // IMPORTANTE: Reemplazar con el número real del vendedor
  private phoneNumber = '573123456789';

  sendQuote(items: CartItem[], total: number): void {
    const message = this.generateWhatsAppMessage(items, total);
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  private generateWhatsAppMessage(items: CartItem[], total: number): string {
    let message = '¡Hola! 👋 Quisiera cotizar los siguientes productos:\n\n';
    const currencyFormatter = new CurrencyPipe('es-CO');

    items.forEach(item => {
      message += `*${item.name}*\n`;
      message += `Cantidad: ${item.quantity}\n`;
      message += `Precio: ${currencyFormatter.transform(item.price, 'COP', 'symbol', '1.0-0')}\n\n`;
    });

    message += `------------------------\n`;
    message += `*TOTAL: ${currencyFormatter.transform(total, 'COP', 'symbol', '1.0-0')}*\n\n`;
    message += `¡Quedo a la espera de la confirmación!`;

    return message;
  }
}
