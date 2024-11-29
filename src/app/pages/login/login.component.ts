import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoginRequest } from '../../Models/Usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  usuario: LoginRequest = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  login() {
    console.log(this.usuario);
    this.authService.Logged(this.usuario).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/dashboard/index']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
