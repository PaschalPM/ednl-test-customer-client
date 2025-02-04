import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerFormService } from '../../../services/form/customer-form.service';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  customerFormGroup!: FormGroup
  controlNames: string[] = []

  constructor(
    public readonly customerFormService: CustomerFormService
  ) {
    this.customerFormGroup = this.customerFormService.getFormGroup()

    this.setControlNames()
  }

  setControlNames() {
    this.controlNames = this.customerFormService.getControlNames(this.customerFormGroup)
  }

  isControlRequired(controlName: string) {
    return this.customerFormService.isControlRequired(this.customerFormGroup, controlName)
  }

  formatLabel(controlName: string) {
    return this.customerFormService.formatLabel(controlName)
  }

  hasError(controlName: string) {
    return this.customerFormService.hasError(this.customerFormGroup, controlName)
  }
  onEdit() {
    this.customerFormService.onEdit(this.customerFormGroup)
  }
}
