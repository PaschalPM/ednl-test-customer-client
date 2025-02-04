import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { CustomerFormService } from '../../../services/form/customer-form.service';


@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule, CommonModule, HeadingComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnDestroy {
  title = "Create Customer"
  customerFormGroup!: FormGroup
  controlNames: string[] = []

  constructor(
    public readonly customerFormService: CustomerFormService
  ) {
    this.customerFormGroup = this.customerFormService.getFormGroup()

    this.setControlNames()
  }

  setControlNames() {
    this.customerFormService.setControlNames(this.customerFormGroup, this.controlNames)
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
  ngOnDestroy(): void {
    this.customerFormService.resetIsSubmitting()
  }
}
