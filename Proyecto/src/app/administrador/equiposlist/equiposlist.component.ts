import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-equiposlist',
  standalone: true,
  imports: [NgFor,NgIf, RouterLink, RouterLink],
  templateUrl: './equiposlist.component.html',
  styleUrl: './equiposlist.component.css'
})
export class EquiposlistComponent implements OnInit {
  equipos: any[] = [];
  equipos2: any[]=[];

  constructor(private service:ServiceService){}

  ngOnInit(): void {
    this.obtenerE();
    this.obtenerE2();
  }
  obtenerE(): void {
    this.service.obtenerE().subscribe(
      (data) => {
        this.equipos = data;
      },
      (error) => {
        Swal.fire('Hubo un Problema!','Tuvimos un problema al obtener los equipos','error')
      }
    );
  }

  obtenerE2(): void {
    this.service.obtenerE2().subscribe(
      (data) => {
        this.equipos2 = data;
      },
      (error) => {
        Swal.fire('Hubo un Problema!','Tuvimos un problema al obtener los equipos','error')
      }
    );
  }

}
