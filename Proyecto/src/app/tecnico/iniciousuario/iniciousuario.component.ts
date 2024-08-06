import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../service/Tecnico.service';
import { CommonModule } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**/import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-iniciousuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './iniciousuario.component.html',
  styleUrl: './iniciousuario.component.css'
})
export class IniciousuarioComponent implements OnInit {
  id: any = '';
  lista: any[]=[];
  isModalOpen: boolean = false;
  equipoSeleccionado: any;
  private notyf: Notyf;
  comentarioForm: FormGroup;
  
  constructor(private service: TecnicoService, private el: ElementRef, private fb: FormBuilder){
    this.comentarioForm = this.fb.group({
      nuevo_comentario: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.notyf = new Notyf({
      duration: 2000,
      position: {
        x: 'center',
        y: 'top',
      },
      dismissible: true
    });
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
        } else {
          this.lista = response.equipos;
        }
      },(error)=>{
        console.error('Error al obtener los equipos:', error);
      }
    );
  }
  empezarMantenimiento(id: any) {
    Swal.fire({
      title: '¿Seguro?',
      text: "¡Comenzar el mantenimiento del equipo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Empezar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.empezarMantenimiento(id).subscribe(
          (response) => {
            if(response.status == 'success'){
              this.notyf.success(response.message);
              this.obtenerEquipos();
            }else{
              this.notyf.error(response.message);
            }
        }, error => {
          this.notyf.error('Ocurrio un error, intenta mas tarde');
        });
      }
    });
  }
  openModal(equipo: any): void {
    this.isModalOpen = true;
    this.equipoSeleccionado = equipo;
    
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
      this.equipoSeleccionado = null;
    }, 300);
  }  
  onSubmit() {
    if (this.comentarioForm.valid) {
      const formData = new FormData();
      formData.append('nuevo_comentario', this.comentarioForm.get('nuevo_comentario')?.value);
      formData.append('id', this.equipoSeleccionado?.id);
      this.service.terminado(formData).subscribe(
        (response) =>{
          if(response.status == 'success'){
            this.notyf.success(response.message);
            this.comentarioForm.reset();
            this.closeModal();
            this.obtenerEquipos();
          }else{
            this.notyf.error(response.message);
          }
        },(error) =>{

        }
      );
    }else {
      this.comentarioForm.markAllAsTouched();
    }
  }
  generarPDF() {
    const docDefinition = {
      content: [
        { text: 'Detalles del Equipo', style: 'header' },
        { text: `ID: ${this.equipoSeleccionado.id}`, style: 'subheader' },
        { text: `Marca: ${this.equipoSeleccionado.marca}`, style: 'content' },
        { text: `Modelo: ${this.equipoSeleccionado.modelo}`, style: 'content' },
        { text: `ID Técnico: ${this.equipoSeleccionado.id_tecnico}`, style: 'content' },
        { text: `Estatus: ${this.equipoSeleccionado.estatus}`, style: 'content' },
        { text: `Comentarios del Administrador: ${this.equipoSeleccionado.comentarios_Admin}`, style: 'content' },
        { text: `Creado en: ${this.equipoSeleccionado.created_at}`, style: 'content' },
        { text: `Actualizado en: ${this.equipoSeleccionado.updated_at}`, style: 'content' },
        { text: `Estatus Actualizado en: ${this.equipoSeleccionado.estatus_updated_at}`, style: 'content' },
        /*{ text: 'Fotos:', style: 'subheader' },
        ...this.equipoSeleccionado.fotos.map((foto: string) => {
          return { image: foto, width: 150, height: 150 };
        })*/
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        content: { fontSize: 12, margin: [0, 0, 0, 5] }
      }
    };

    pdfMake.createPdf(docDefinition).download(`DetallesEquipo_${this.equipoSeleccionado.id}.pdf`);
  }/**/
}
