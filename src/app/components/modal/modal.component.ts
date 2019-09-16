import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { Food } from '../buttons/buttons.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.product.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  forma: FormGroup;

  foods: Food[] = [
    {value: 'Products', viewValue: 'Productos'},
    {value: 'Tiendas', viewValue: 'Tiendas'},
    {value: 'Proveedores', viewValue: 'Proveedores'},
    {value: 'Stock', viewValue: 'Stock'},
  ];

  constructor(
    private store: StoreService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      store.editFormAsObservable$.subscribe(
        astronaut => {
          this.forma.patchValue({
            name: 'Todd Motto',
            stock: 0,
            proveedor: 'Todd Motto'            
          });       
        });


    }

  ngOnInit() {

    this.forma = new FormGroup({
      'name': new FormControl( '', Validators.required ),
      'stock': new FormControl( 0, Validators.min(0) ),
      'proveedor': new FormControl( '', Validators.required  ),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
