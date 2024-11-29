import { Component, inject, OnInit } from '@angular/core';
import { SunatService } from '../../Services/sunat.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Models/Cliente';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsuarioRequest, UsuarioResponse } from '../../Models/Usuario';
import { AuthService } from '../../Services/auth.service';
import { TablesComponent } from '../../components/tables/tables.component';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [TablesComponent, FormsModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css',
})
export class RegistrarClienteComponent implements OnInit {
  showForm: boolean = false;
  authService = inject(AuthService);
  NewUsuario: UsuarioRequest = {
    username: '',
    password: '',
    documento: '',
    nombre: '',
    direccion: '',
    telefono: '',
  };
  Usuarios: UsuarioResponse[] = [];
  constructor(
    private sunatService: SunatService,
    private router: Router,
    private clienteService: ClienteService
  ) {}
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  buscarRuc(ruc: string) {
    this.sunatService.buscarRuc(ruc).subscribe(
      (data) => {
        this.NewUsuario.nombre = data.razonSocial;
        this.NewUsuario.direccion = data.direccion;
      },
      (error) => {
        console.error('Error al consultar RUC:', error);
      }
    );
  }
  redirigir(pagina: string): void {
    if (pagina == 'editar') {
      this.router.navigate(['/detalles-cliente']);
    }
  }

  nuevo(
    ruc: string,
    razonSocial: string,
    direccion: string,
    telefono: string,
    correo: string
  ): void {
    const cliente = {
      id: 0,
      ruc: Number(ruc),
      razon_social: razonSocial,
      direccion: direccion,
      telefono: Number(telefono),
      email: correo,
      fecha_registro: new Date(),
    };
    this.clienteService.crear(cliente).subscribe(
      (response) => {
        console.log('Cliente registrado', response);
      },
      (error) => {
        console.error('Error al registrar el cliente', error);
      }
    );
  }
  Registrar() {
    this.authService.register(this.NewUsuario).subscribe(
      (response) => {
        console.log('Usuario registrado', response);
        this.cargarUsuarios();
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }
  cargarUsuarios() {
    this.authService.listar().subscribe(
      (data) => {
        this.Usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
