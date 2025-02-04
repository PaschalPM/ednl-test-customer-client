import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../../services/api/customers.service';
import { Router } from '@angular/router';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { CustomerFormService } from '../../../services/form/customer-form.service';


@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule, CommonModule, HeadingComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
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
  onCreate() {
    this.customerFormService.onCreate(this.customerFormGroup)
  }
}
