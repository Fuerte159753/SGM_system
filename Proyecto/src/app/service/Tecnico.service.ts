import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService{
    constructor(private http:HttpClient) { }
    urll='http://127.0.0.1:8000/api/Tecnico/'
    //urll='https://sgmsystem.proyectoinutvm.com/backend/backend/public/api/Tecnico/';

    obtenerEquipos(id: any){
        return this.http.post<any>(this.urll + 'obtener',{id});
    }
    empezarMantenimiento(id: any){
      return this.http.post<any>(this.urll + 'updatestatus',{id});
    }
    getphoto(id: any){
      return this.http.post<any>(this.urll + 'optenerphoto',{id});
    }
    terminado(formData: FormData){
      return this.http.post<any>(`${this.urll+'terminar'}`, formData)
    }
    //perfil
    getAdminById(id: number): Observable<any> {
      return this.http.get<any>(`${this.urll}perfil/${id}`);
    }
    updateAdmin(id: number, data: any): Observable<any> {
      return this.http.put<any>(`${this.urll+'perfil/'}${id}`, data);
    }
    updatepass(id: number, data: any): Observable<any>{
      return this.http.put<any>(`${this.urll+'perfilpassword/'}${id}`, data)
    }
    updateProfilePicture(formData: FormData): Observable<any> {
      return this.http.post<any>(`${this.urll+'fotoadmin'}`, formData);
    }
}