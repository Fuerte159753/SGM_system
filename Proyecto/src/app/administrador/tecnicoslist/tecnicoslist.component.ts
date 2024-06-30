import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-tecnicoslist',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './tecnicoslist.component.html',
  styleUrl: './tecnicoslist.component.css'
})
export class TecnicoslistComponent implements OnInit {
  tecnicos: any[] = [];

  constructor(private service:ServiceService){}

  ngOnInit(): void {
    this.obtenerTecnicos();
  }
  obtenerTecnicos(): void {
    this.service.obtenerTecnicos().subscribe(
      (data) => {
        this.tecnicos = data;
      },
      (error) => {
        console.error('Error al obtener técnicos', error);
      }
    );
  }
}
