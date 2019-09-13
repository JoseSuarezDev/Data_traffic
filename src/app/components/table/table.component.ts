import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StoreService } from 'src/app/services/store.service';
import { ProductData } from 'src/app/models/interfaces';
import {SelectionModel} from '@angular/cdk/collections';

import { Observable, Subscription } from 'rxjs';

/** Constants used to fill up our data base. */
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

  displayedColumns: string[] = ['select', 'id', 'name', 'stock', 'proveedor'];
  dataSource: MatTableDataSource<ProductData>;
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(  private service: StoreService ) {
    service.missionConfirmed$.subscribe(
      astronaut => {
        console.log(this.service.getItems(astronaut));        
        this.dataSource = new MatTableDataSource(this.service.getItems(astronaut));
      });

      //modal
    service.dialogAsObservable$.subscribe(
      astronaut => {
        console.log( astronaut );        
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
        // this.selection.clear()
        
        console.log(array);
      });
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {

    this.items = this.service.getItems();
    this.items$ = this.service.getItems();
    // this.items$.subscribe( value => console.log(value) )

    // this.service.getItems()
    //   .subscribe( values => {console.log(values)} );

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
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

/** Builds and returns a new User. */
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
