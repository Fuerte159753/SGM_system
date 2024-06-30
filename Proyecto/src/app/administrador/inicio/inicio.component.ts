import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  currentDate: Date = new Date();

  Fecha(): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dayOfWeek = daysOfWeek[this.currentDate.getDay()];
    const day = this.currentDate.getDate();
    const month = months[this.currentDate.getMonth()];
    const year = this.currentDate.getFullYear();
    let hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    return `${dayOfWeek}, ${day} de ${month} de ${year}, ${formattedTime}`;
  }

}
