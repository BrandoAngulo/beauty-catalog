import { Routes } from '@angular/router';
import { CatalogPagesComponent } from './pages/catalog-pages/catalog-pages.component';

export const routes: Routes = [
    {
        path: '',
        component: CatalogPagesComponent,
        title: 'Catálogo de de belleza',
    },
    {
        // Redirige cualquier ruta no encontrada a la página principal
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },

];
