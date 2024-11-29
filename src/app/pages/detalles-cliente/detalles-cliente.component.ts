import { Component, inject, OnInit } from '@angular/core';
import { UsuarioResponse } from '../../Models/Usuario';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalles-cliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detalles-cliente.component.html',
  styleUrl: './detalles-cliente.component.css',
})
export class DetallesClienteComponent implements OnInit {
  usuario: UsuarioResponse | null = null;

  authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
  Registrar() {}
}
