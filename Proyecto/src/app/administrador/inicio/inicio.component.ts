import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  currentDate: Date = new Date();
  icons = [
    { type: 'success', class: 'bi bi-check-circle text-green-400', message: 'la operacion fue exitosa!', noty:'Exito' },
    { type: 'error', class: 'bi bi-x-circle text-red-600', message: 'Ocurrio un error, pero trabajaremos en ello.', noty:'Error' },
    { type: 'warning', class: 'bi bi-exclamation-circle text-amber-400', message: 'Seguro que desea realizar esta accion.', noty:'Precaucion' },
    { type: 'info', class: 'bi bi-question-circle text-cyan-500', message: 'Esta informacion es delicada.', noty:'Seguro?' }
  ];
  currentIcon = this.icons[0]; // Por defecto, usa el primer ícono.
  isVisible = false;
  animationClass = '';

  constructor() {}

  showNotification(type: string) {
    this.currentIcon = this.icons.find(icon => icon.type === type) || this.icons[0];
    this.isVisible = true;
    this.animationClass = 'animation-slide-in-right'; // Aplica la animación de entrada

    // Configurar un temporizador para ocultar la notificación después de 5 segundos
    setTimeout(() => {
      this.animationClass = 'animation-slide-out-right'; // Cambiar a la animación de salida
      setTimeout(() => {
        this.isVisible = false; // Ocultar completamente después de la animación
      }, 500); // Duración de la animación de salida
    }, 3000);
  }

  closeNotification() {
    this.animationClass = 'animation-slide-out-right'; // Cambiar a la animación de salida
    setTimeout(() => {
      this.isVisible = false; // Ocultar completamente después de la animación
    }, 500); // Duración de la animación de salida
  }

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
