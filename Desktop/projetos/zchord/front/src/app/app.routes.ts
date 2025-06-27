// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Verifique se este caminho de importação está correto
import { HomePageComponent } from './features/home/pages/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent }
];
