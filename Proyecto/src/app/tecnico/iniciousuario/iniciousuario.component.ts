import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../service/Tecnico.service';
import { CommonModule } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';

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
  isModalOpen: boolean = false;
  
  constructor(private service: TecnicoService, private el: ElementRef){
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }
  ngOnInit(): void {
    this.id = sessionStorage.getItem('keyTec');
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
    this.isModalOpen = true;
    setTimeout(() => {
      const modal = document.getElementById('modal-asignar');
      modal?.classList.add('show');
    }, 10);
  }
  closeModal(): void {
    const modal = document.getElementById('modal-asignar');
    modal?.classList.remove('show');
    setTimeout(() => {
      this.isModalOpen = false;
    }, 300);
  }
}
