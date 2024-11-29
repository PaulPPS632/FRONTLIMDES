import { Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, UsuarioResponse } from '../Models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = appsettings.apiUrl + 'auth';

  public usuarioSubject = new BehaviorSubject<UsuarioResponse | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const userString = localStorage.getItem('User');
    if (userString) {
      try {
        const usuario: UsuarioResponse = JSON.parse(userString);
        this.usuarioSubject.next(usuario);
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage:', error);
      }
    }
  }

  register(registerRequest: any): Observable<UsuarioResponse> {
    return this.http
      .post<UsuarioResponse>(`${this.apiUrl}/register`, registerRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem('User', JSON.stringify(response));
        })
      );
  }
  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/listar`);
  }

  Logged(login: LoginRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/login`, login).pipe(
      tap((response) => {
        localStorage.setItem('User', JSON.stringify(response));
        this.usuarioSubject.next(response);
      })
    );
  }

  logout() {
    localStorage.removeItem('User');
    this.usuarioSubject.next(null);
  }

  getUsuario(): any | null {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }
}
