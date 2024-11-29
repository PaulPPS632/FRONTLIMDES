import { Component } from '@angular/core';
import { SunatService } from '../../Services/sunat.service';

@Component({
  selector: 'app-registrar-proveedor',
  standalone: true,
  imports: [],
  templateUrl: './registrar-proveedor.component.html',
  styleUrl: './registrar-proveedor.component.css'
})
export class RegistrarProveedorComponent {
  
  daSu: any={}; 

  constructor(private sunatService: SunatService) {}

  buscarRuc(ruc: string) {
    this.sunatService.buscarRuc(ruc).subscribe(
      (data) => {
        this.daSu = data;
      },
      (error) => {
        console.error('Error al consultar RUC:', error);
      }
    );
  }
}
