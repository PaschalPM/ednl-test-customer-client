import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFormService } from '../../../services/form/customer-form.service';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../../services/api/customers.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [HeadingComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  customerFormGroup!: FormGroup
  controlNames: string[] = []
  title = ''
  customerData: any

  private originalValue: Record<string, any> = {}
  private destroy$ = new Subject<void>()


  constructor(
    public readonly customerFormService: CustomerFormService,
    private readonly customerApiService: CustomersService,
    private readonly route: ActivatedRoute
  ) {
    this.customerFormGroup = this.customerFormService.getFormGroup()
    this.setControlNames()
    this.syncCustomerDataAndSetTitle()

  }

  syncCustomerDataAndSetTitle() {
    this.customerData = this.customerFormService.getActiveCustomer()
    if (!this.customerData) {
      const customerId = this.route.snapshot.params['id']
      this.customerApiService.getCustomerById(customerId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((v: any) => {
          this.customerData = v.data
          this.setTitleAndFormGroup()
          this.setOriginalValue(this.customerFormGroup)
        })
    }
    else {
      this.setTitleAndFormGroup()
      this.setOriginalValue(this.customerFormGroup)
    }

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

  onUpdate() {
    console.log(this.customerFormGroup.dirty)
    this.customerFormGroup.addControl('id', new FormControl(this.customerData.id))
    this.customerFormService.onUpdate(this.customerFormGroup, this.customerData.id)
  }

  get isFormDirty() {
    let isDifferent = false

    for (const key of Object.keys(this.originalValue)) {
      const formValue = this.customerFormGroup.value[key];
      const originalValue = this.originalValue[key];

      if (formValue !== originalValue) {
        if (['voters_card', 'id_card', 'drivers_licence'].includes(key)) {
          if (!!originalValue !== !!formValue) {
            isDifferent = true;
            break;
          }
        } else {
          isDifferent = true;
          break;
        }
      }
    }

    return this.customerFormGroup && this.customerFormGroup.dirty && isDifferent
  }

  private setOriginalValue(formGroup: FormGroup) {
    this.originalValue = { ...formGroup.value }
  }
  private setTitleAndFormGroup() {
    this.title = `Edit ${this.customerData.firstname}'s Profile`

    for (let key in this.customerData) {
      this.customerFormGroup.patchValue({ [key]: this.customerData[key] })
    }
  }

  ngOnDestroy(): void {
    this.customerFormService.resetIsSubmitting()
    this.customerFormService.resetActiveCustomer()
    this.destroy$.next()
    this.destroy$.complete()
  }
}
