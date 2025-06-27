// src/app/features/home/components/search-bar/search-bar.component.ts
import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Output() searchTerm = new EventEmitter<string>();

  searchControl = new FormControl('');
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges.pipe(
      // Espera 300ms de pausa na digitação
      debounceTime(300),

      // Só emite se o valor atual for diferente do anterior
      distinctUntilChanged()

    ).subscribe(value => {
      // Emite o valor para o componente pai
      this.searchTerm.emit(value || '');
    });
  }

  ngOnDestroy(): void {
    // Cancela a inscrição para evitar vazamentos de memória
    this.searchSubscription?.unsubscribe();
  }
}
