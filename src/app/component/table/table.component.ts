import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { JsonPipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconModuleModule } from '../../icon-module/icon-module.module';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconModuleModule, NgIf, NgFor, JsonPipe, SlicePipe, NgClass, ReactiveFormsModule, FormsModule],
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
  showAddModal: boolean = false;
  selectedRows: any[] = [];
  allSelected: boolean = false;
  userForm!: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initForm()
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
  addModal() {
    this.showAddModal = true;
  }
  removeAddModal() {
    this.showAddModal = false;
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


  // add data in grid

  initForm() {
    this.userForm = this.fb.group({
      id: [''],
      email: ['jhon@gmail.com', [Validators.required, Validators.email]],
      license_used: [20],
      role: ['UI developer'],
      status: ['Customer'],
      name: this.fb.group({
        first_name: ['jhon'],
        last_name: ['done'],
        handle: ['@uiux']
      }),
      teams: this.fb.array([  {
        value: 'Development',
        text_color: '#ffffff',
        background_color: '#1e40af'
      },
      {
        value: 'Design',
        text_color: '#000000',
        background_color: '#facc15'
      },
      {
        value: 'Marketing',
        text_color: '#ffffff', 
        background_color: '#10b981'
      }])
    });
  }

  openEditModal(item: any = null) {
    this.selectedItem = item;
    this.showEditModal = true;

    if (item) {
      this.userForm.patchValue(item);
      this.userForm.setControl('teams', this.fb.array(item.teams || []));
    } else {
      this.userForm.reset();
      this.userForm.setControl('teams', this.fb.array([]));
    }
  }

  get teams(): FormArray {
    return this.userForm.get('teams') as FormArray;
  }

  addTeam(team: any = { text_color: '', background_color: '', value: '' }) {
    this.teams.push(this.fb.group(team));
  }

  removeTeam(index: number) {
    this.teams.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const formValue = this.userForm.value;
    if (this.selectedItem) {
      const index = this.gridRows.findIndex(row => row.id === this.selectedItem.id);
      if (index > -1) {
        this.gridRows[index] = formValue;
      }
    } else {
      formValue.id = crypto.randomUUID(); // or use a custom UUID
      this.gridRows = [formValue, ...this.gridRows]
    }
    this.removeAddModal();
  }

}





