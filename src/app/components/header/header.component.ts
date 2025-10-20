import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CartService } from "../../services/cart-service";

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartService = inject(CartService);
  @Input() isMobile: boolean = false;
  @Output() cartToggle = new EventEmitter<void>();
}
