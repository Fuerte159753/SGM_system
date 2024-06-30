import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  url='http://localhost/noveno/'

  //login
  login(loginData: { email: string; password: string }){
    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);
    return this.http.post<any>(this.url + 'login.php', formData);
  }
  //admin
  idtec():Observable<any> {
    return this.http.get<any>(this.url + 'obtenid.php');
  }
  regtec(formData: FormData) {
    return this.http.post<any>(this.url + 'registrot.php', formData);
  }
  ide() {
    return this.http.get<any>(this.url + 'idequip.php');
  }
  regequi(formData: FormData){
    return this.http.post<any>(this.url + 'registroe.php', formData);
  }
  obtenerTecnicos(){
    return this.http.get<any>(this.url + 'tecni.php');
  }
  obtenerE(){
    return this.http.get<any>(this.url + 'Equipo.php');
  }
  obtenerE2(){
    return this.http.get<any>(this.url + 'Equipo2.php');
  }
  //user
}
