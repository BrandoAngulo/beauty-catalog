import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { WhatsAppService } from '../../services/whats-app-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../../models/product';
import { map, Observable } from 'rxjs';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-catalog-pages',
  standalone: true,
  imports: [
        CommonModule,
    FormsModule,
    AsyncPipe,
    // Angular Material
    MatSidenavModule,
    MatGridListModule,
    MatChipsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    // Custom Components
    HeaderComponent,
    ProductCardComponent,
    CartDrawerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './catalog-pages.component.html',
  styleUrl: './catalog-pages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPagesComponent implements OnInit {
   // --- Inyección de Servicios ---
  productService = inject(ProductService);
  cartService = inject(CartService);
  whatsAppService = inject(WhatsAppService);
  breakpointObserver = inject(BreakpointObserver);
  snackBar = inject(MatSnackBar);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  // --- Estado con Signals y Observables ---
  allProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  categories = signal<string[]>(['Todo', 'Cabello', 'Maquillaje', 'Manicura/Pedicura']);
  selectedCategory = signal<string>('Todo');
  searchTerm = signal<string>('');

  isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches));

  gridCols$: Observable<number> = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).pipe(
    map(result => {
      if (result.breakpoints[Breakpoints.XSmall]) { return 1; }
      if (result.breakpoints[Breakpoints.Small]) { return 2; }
      if (result.breakpoints[Breakpoints.Medium]) { return 3; }
      return 4; // Large and XLarge
    })
  );

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts.set(products);
      this.filterProducts();
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
    this.filterProducts();
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term.toLowerCase());
    this.filterProducts();
  }

  filterProducts(): void {
    let products = this.allProducts();
    const category = this.selectedCategory();
    const term = this.searchTerm();

    if (category !== 'Todo') {
      products = products.filter(p => p.category.includes(category));
    }
    if (term) {
      products = products.filter(p => p.name.toLowerCase().includes(term));
    }
    this.filteredProducts.set(products);
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem(product);
    this.snackBar.open(`${product.name} agregado al carrito`, 'Cerrar', {
      duration: 2500,
      panelClass: 'success-snackbar'
    });
  }

  onUpdateQuantity(event: { productId: number, quantity: number }): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  onSendQuote(): void {
    let items: CartItem[] = [];
    let total: number = 0;
    const cartSub = this.cartService.cartItems$.subscribe(i => items = i);
    const totalSub = this.cartService.total$.subscribe(t => total = t);

    if (items.length > 0) {
      this.whatsAppService.sendQuote(items, total);
    }

    cartSub.unsubscribe();
    totalSub.unsubscribe();
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}
