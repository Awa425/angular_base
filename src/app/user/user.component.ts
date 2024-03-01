import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addUserForm: FormGroup; // Formulaire d'ajout d'utilisateur
  selectedUser: User | null = null; // Utilisateur sélectionné pour la modification

  get form() {
    return this.addUserForm.controls;
  } // Raccourci pour accéder aux contrôles de formulaire

  addUser() {
    // Vérifie si le formulaire est valide
    if (this.addUserForm.invalid) {
      return;
    }

    // Crée un nouvel utilisateur avec les valeurs saisies dans le formulaire
    const newUser: User = {
      id: this.users.length + 1, // Générez un ID unique (ici juste un ID incrémenté)
      name: this.form.name.value,
      email: this.form.email.value,
    };

    // Ajoute le nouvel utilisateur à la liste des utilisateurs
    this.users.push(newUser);

    // Réinitialise le formulaire après l'ajout
    this.addUserForm.reset();
  }

  // Méthode pour sélectionner un utilisateur pour modification
  selectUser(user: User) {
    this.selectedUser = user;
    // Remplir le formulaire avec les détails de l'utilisateur sélectionné
    this.addUserForm.patchValue({
      name: user.name,
      email: user.email,
    });
  }

  // Methode pour modifier un utilisateur
  updateUser() {
    if (this.addUserForm.invalid || !this.selectedUser) {
      return;
    }

    const updatedUser: User = {
      ...this.selectedUser,
      name: this.form.name.value,
      email: this.form.email.value,
    };

    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }

    this.selectedUser = null;
    this.addUserForm.reset();
  }

  deleteUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
