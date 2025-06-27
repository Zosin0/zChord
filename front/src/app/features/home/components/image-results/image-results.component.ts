// src/app/features/home/components/image-results/image-results.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Barre {
  fret: number;
  fromString: number;
  toString: number;
}

@Component({
  selector: 'app-image-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-results.component.html',
  styleUrls: ['./image-results.component.css']
})
export class ImageResultsComponent implements OnChanges {
  @Input() chords: any[] = [];

  public parsedChords: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chords'] && this.chords) {
      this.parsedChords = this.chords.map(chord => {
        const voicing = chord.strings.split(' ').map((s: string) => s === 'X' ? -1 : parseInt(s, 10));
        const fretNumbers = voicing.filter((f: number) => f > 0);

        let offset = 1;
        if (fretNumbers.length > 0) {
          const minFret = Math.min(...fretNumbers);
          if (minFret > 4) {
             offset = minFret;
          }
        }

        let barre: Barre | null = null;
        if (fretNumbers.length > 1) {
          const minFret = Math.min(...fretNumbers);

          // --- CORREÇÃO AQUI ---
          // Adicionamos os tipos para 'fret' e 'index'
          const barreStrings = voicing
            .map((fret: number, index: number) => fret === minFret ? index : -1)
            .filter((index: number) => index !== -1);

          if (barreStrings.length > 1) {
            barre = {
              fret: minFret,
              fromString: Math.min(...barreStrings),
              toString: Math.max(...barreStrings)
            };
          }
        }

        return {
          ...chord,
          offset: offset,
          voicing: voicing,
          barre: barre
        };
      });
    }
  }

  formatChordName(name: string): string {
    return name ? name.replace(/,/g, ' ').trim() : '';
  }
}
