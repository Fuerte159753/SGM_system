import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavUComponent } from './nav-u/nav-u.component';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [RouterOutlet, NavUComponent],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.css'
})
export class TecnicoComponent {

}
