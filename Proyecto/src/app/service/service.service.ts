import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  urll='http://127.0.0.1:8000/api/admin/'

  //login
  login(loginData: { email: string; password: string }){
    return this.http.post<any>(this.urll + 'login', loginData);
  }
  //admin
  idtec():Observable<any> {
    return this.http.get<any>(this.urll + 'count');
  }
  regtec(formData: FormData) {
    return this.http.post<any>(this.urll + 'newT', formData);
  }
  ide() {
    return this.http.get<any>(this.urll + 'countEq');
  }
  regequi(formData: FormData){
    return this.http.post<any>(this.urll + 'newE', formData);
  }
  obtenerTecnicos(){
    return this.http.get<any>(this.urll + 'show');
  }
  obtenerE(){
    return this.http.get<any>(this.urll + 'showcorrectivo');
  }
  obtenerE2(){
    return this.http.get<any>(this.urll + 'showpreventivo');
  }
  obtenerlistatec(){
    return this.http.get<any>(this.urll + 'listec');
  }
  asignarEquipo(formData: FormData){
    return this.http.post<any>(this.urll + 'asignar2', formData);
  }
  obtenerlistaAsignados(){
    return this.http.get<any>(this.urll + 'listasignacion');
  }
  actualizarTecnico(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.urll + 'update/'}${id}`, data);
  }
  inabilitarTec(id: any){
    return this.http.delete<any>(`${this.urll + 'inhabilitar/'}${id}`);
  }
  //user
}