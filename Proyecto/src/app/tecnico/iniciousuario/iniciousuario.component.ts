import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../service/Tecnico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciousuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iniciousuario.component.html',
  styleUrl: './iniciousuario.component.css'
})
export class IniciousuarioComponent implements OnInit {
  id: any = '';
  lista: any[]=[];
  
  constructor(private service: TecnicoService){
  }
  ngOnInit(): void {
    this.id = sessionStorage.getItem('keyAdmin');
    this.obtenerEquipos();
  }
  obtenerEquipos(){
    this.service.obtenerEquipos(this.id).subscribe(
      (response) => {
        if (response.status === "no equipos") {
          this.lista = [];
          console.log('error de el array');
          console.log(this.lista);
        } else {
          this.lista = response.equipos;
          console.log('se agrego datos a el array');
          console.log(this.lista);
        }
      },(error)=>{
        console.error('Error al obtener los equipos:', error);
      }
    );
  }
  openModal(equipo: any):void{

  }
}
