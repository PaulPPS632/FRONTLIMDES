export interface Usuario {
  id: number;
  username: string;
  password: string;
}
export interface UsuarioRequest {
  username: string;
  password: string;
  documento: string;
  nombre: string;
  direccion: string;
  telefono: string;
}
export interface UsuarioResponse {
  id: number;
  username: string;
  documento: string;
  nombre: string;
  direccion: string;
  telefono: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
