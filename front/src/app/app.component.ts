// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // <- Precisa disso

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // <- E disso
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
