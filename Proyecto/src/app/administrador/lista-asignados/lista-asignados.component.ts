import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-asignados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-asignados.component.html',
  styleUrl: './lista-asignados.component.css'
})
export class ListaAsignadosComponent implements OnInit {
  equiposAsignados: any[] = [];
  constructor(private service: ServiceService){

  }
  ngOnInit(): void {
    this.listaEquipos();
  }

  listaEquipos(){
    this.service.obtenerlistaAsignados().subscribe(
      (data) => {
        this.equiposAsignados = data;
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }
}
