// src/app/features/home/pages/home-page.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ImageResultsComponent } from '../components/image-results/image-results.component';
import { ZChordsApiService } from '../../../core/services/z-chords-api.service';
import { finalize } from 'rxjs/operators'; // Importe o finalize

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    ImageResultsComponent
    // ZChordsApiService FOI REMOVIDO DAQUI
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  searchResults: any[] = [];
  isLoading = false; // <-- NOSSA NOVA PROPRIEDADE DE ESTADO
  searchPerformed = false; // <-- Opcional: para saber se uma busca já foi feita

  constructor(private apiService: ZChordsApiService) {}

  handleSearch(term: string) {
    if (!term || term.trim() === '') {
      this.searchResults = [];
      this.searchPerformed = false;
      return;
    }

    this.isLoading = true; // <-- ATIVA O LOADING
    this.searchPerformed = true; // Marca que a busca começou
    this.searchResults = []; // Limpa resultados anteriores

    this.apiService.searchChord(term).pipe(
      finalize(() => {
        this.isLoading = false; // <-- DESATIVA O LOADING (sempre, em caso de sucesso ou erro)
      })
    ).subscribe(results => {
      this.searchResults = results;
    });
  }
}


