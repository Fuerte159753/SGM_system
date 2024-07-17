import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-tecnicoslist',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './tecnicoslist.component.html',
  styleUrl: './tecnicoslist.component.css'
})
export class TecnicoslistComponent implements OnInit {
  tecnicos: any[] = [];
  private notyf: Notyf;

  constructor(private service:ServiceService){
    this.notyf = new Notyf({
      duration: 2000, // Duración de la notificación en milisegundos
      position: {
        x: 'center',
        y: 'top', // Posición en la parte inferior central
      },
      dismissible: true // Permite al usuario cerrar la notificación
    });
  }

  ngOnInit(): void {
    this.obtenerTecnicos();
  }
  obtenerTecnicos(): void {
    this.service.obtenerTecnicos().subscribe(
      (response) => {
        if(!response){
          this.notyf.error('Parece que no hay tecnicos registrados');
        }else{
          this.tecnicos = response.data;
        }

      },
      (error) => {
        this.notyf.error('Parece que no hay tecnicos registrados');
        console.error('Error al obtener técnicos', error);
      }
    );
  }

}
