import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioRequest } from '../Models/Usuario';
import { appsettings } from '../Settings/appsettings';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiurl: string = appsettings.apiUrl + 'ingreso';
  constructor(private http: HttpClient) {}
}
