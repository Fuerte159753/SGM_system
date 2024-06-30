import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [RouterLink, NavComponent, RouterOutlet, NgIf],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  
}
