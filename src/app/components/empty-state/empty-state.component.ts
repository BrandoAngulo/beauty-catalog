import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
    @Input() title: string = 'Nada por aquí';
    @Input() message: string = 'No hay elementos para mostrar.';
    @Input() icon: string = 'sentiment_dissatisfied';
}
