import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CheckList {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  checklists: CheckList[] = [
    { name: 'Tâche 1', checked: false },
    { name: 'Tâche 2', checked: true },
    { name: 'Tâche 3', checked: false },
  ];
  newChecklistForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.newChecklistForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addChecklist() {
    if (this.newChecklistForm.valid) {
      const name = this.newChecklistForm.get('name')!.value;
      this.checklists.push({ name: name, checked: false });
      this.newChecklistForm.reset();
    }
  }

  deleteChecklist(item: CheckList) {
    const index = this.checklists.indexOf(item);
    if (index !== -1) {
      const confirmDelete = confirm('Confirmer la suppression ?');
      if (confirmDelete) {
        this.checklists.splice(index, 1);
      }
    }
  }

  clear() {
    this.checklists = [];
  }
}
