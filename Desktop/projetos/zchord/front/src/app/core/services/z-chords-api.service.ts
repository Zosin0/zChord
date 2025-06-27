// src/app/core/services/z-chords-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZChordsApiService {
  // ATUALIZADO: Aponta para a nossa API Python local
  private readonly API_URL = 'http://localhost:5000/api/chord/';

  constructor(private http: HttpClient) { }

  searchChord(chordName: string): Observable<any[]> { // Garante o retorno de um array
    if (!chordName) {
      return of([]);
    }

    // A URL agora é para o nosso back-end
    const url = `${this.API_URL}${chordName}`;

    return this.http.get<any>(url).pipe(
      // Transforma a resposta de objeto único em um array com um item
      map(response => [response]),
      catchError(error => {
        console.error('Erro ao buscar o acorde na nossa API:', error);
        return of([]);
      })
    );
  }
}
