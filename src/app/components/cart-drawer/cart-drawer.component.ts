import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    EmptyStateComponent,
    CommonModule,
    CurrencyPipe,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    EmptyStateComponent
],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDrawerComponent {
    @Input() cartItems: CartItem[] = [];
    @Input() total: number | null = 0;
    @Output() close = new EventEmitter<void>();
    @Output() updateQty = new EventEmitter<{productId: number, quantity: number}>();
    @Output() removeItem = new EventEmitter<number>();
    @Output() sendQuote = new EventEmitter<void>();

    trackById(index: number, item: CartItem): number {
        return item.productId;
    }
}
