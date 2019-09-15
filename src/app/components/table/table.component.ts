import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StoreService } from 'src/app/services/store.service';
import { ProductData } from 'src/app/models/interfaces';
import {SelectionModel} from '@angular/cdk/collections';

import { Observable, Subscription } from 'rxjs';

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  items$: Observable<any>;
  items = []

  subscription: Subscription;

  displayedColumns: string[] = ['select', 'numRef', 'name', 'stock', 'proveedor'];
  dataSource: MatTableDataSource<ProductData>;
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(  private service: StoreService ) {
    service.missionConfirmed$.subscribe(
      astronaut => {   
        console.log(astronaut);        
        this.selection.clear()
        switch (astronaut) {
          case 'tiendas':            
            this.displayedColumns = ['select', 'state' , 'name', 'rif'];        
            this.dataSource = new MatTableDataSource(this.service.getItems(astronaut));
            break;
          case 'proveedores':            
            this.displayedColumns = ['select', 'name' , 'name'];    
            break;    
          default:            
            this.displayedColumns = ['select', 'numRef', 'name', 'stock', 'proveedor'];
            this.dataSource = new MatTableDataSource(this.service.getItems(astronaut));
        }
           
        
      });

    service.dialogAsObservable$.subscribe(
      astronaut => {      
      });

    this.subscription = service.missionAnnounced$.subscribe(
      () => {     
        let array = this.service.getItems('products')
        let array2 = this.selection.selected 
      
        array2.forEach( (value) =>  { 

          for( var i = 0; i < array.length; i++){ 
            if ( array[i].id === value.id) {
              array.splice(i, 1); 
            }
         }

        })    
        this.dataSource = new MatTableDataSource(array);
        this.isAllSelected()
        
      });
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {

    this.items = this.service.getItems();
    this.items$ = this.service.getItems();

    this.dataSource = new MatTableDataSource(this.items);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // this.confirmed = true;
    // this.service.confirmMission('hernesto');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    let data = JSON.stringify(this.selection.selected)
    localStorage.setItem('selected', data)
    this.service.countSelectSubject(this.selection.selected.length);
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    } 
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

function createNewUser(id: number): ProductData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id,
    name: name,
    stock: Math.round(Math.random() * 100),
    proveedor: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

}
