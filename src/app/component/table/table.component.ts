import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconModuleModule } from '../../icon-module/icon-module.module';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconModuleModule, NgIf, NgFor, JsonPipe, NgClass],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  gridColumns: any[] = [];
  gridRows: any[] = [];
  loading = true;
  error = '';
  selectedItem: any = null;
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;
  selectedRows: any[] = [];
  allSelected: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.fetchGridData().subscribe({
      next: (data: any) => {
        this.gridColumns = data.grid_columns;
        this.gridRows = data.grid_data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Failed to load data';
        this.loading = false;
      },
    });
  }


  confirmDelete(item: any) {
    this.selectedItem = item;
    this.showDeleteModal = true;
  }

  confirmEdit(item: any) {
    this.selectedItem = item;
    this.showEditModal = true;
  }
  cancelEdit() {
    this.selectedItem = null;
    this.showEditModal = false;
  }

  deleteConfirmed() {
    this.gridRows = this.gridRows.filter(row => row !== this.selectedItem);
    this.cancelDelete();
  }

  cancelDelete() {
    this.selectedItem = null;
    this.showDeleteModal = false;
  }

  toggleAllSelection(event: any) {
    this.allSelected = event.target.checked;
    if (this.allSelected) {
      this.selectedRows = [...this.gridRows];
    } else {
      this.selectedRows = [];
    }
  }

  toggleRowSelection(row: any, event: any) {
    if (event.target.checked) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter(r => r !== row);
      this.allSelected = false;
    }

    if (this.selectedRows.length === this.gridRows.length) {
      this.allSelected = true;
    }
  }

}





