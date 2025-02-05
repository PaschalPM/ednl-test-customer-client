import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DeleteComponent } from '../../svgs/delete/delete.component';
import { AddPersonComponent } from '../../svgs/add-person/add-person.component';
import { EditComponent } from '../../svgs/edit/edit.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-action-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './action-button.component.html',
})
export class ActionButtonComponent {
  type = input.required<'add' | 'edit' | 'delete'>()
  handleClick = output<Event>()

  get icon() {
    switch (this.type()) {
      case 'add':
        return AddPersonComponent
      case 'delete':
        return DeleteComponent
      default:
        return EditComponent
    }
  }

  get text() {
    switch (this.type()) {
      case 'add':
        return 'Add new customer'
      case 'delete':
        return 'Delete'
      default:
        return 'Edit'
    }
  }
}
