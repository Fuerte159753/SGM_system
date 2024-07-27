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
}