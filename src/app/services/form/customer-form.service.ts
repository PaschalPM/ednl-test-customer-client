import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../api/customers.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {
  private controlNames: string[] = []
  private isSubmitting = false
  private activeCustomer: any

  constructor(
    private readonly customerService: CustomersService,
    private readonly router: Router,
    private readonly fb: FormBuilder,

  ) { }

  getFormGroup() {
    return this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      bvn: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      residential_address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      bankcode: ['', [Validators.required]],
      accountnumber: ['', [Validators.required]],
      company_id: ['', [Validators.required]],
      email: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      id_card: [''],
      voters_card: [''],
      drivers_licence: ['']
    })
  }

  getControlNames(formGroup: FormGroup) {
    for (let x in formGroup.controls) {
      this.controlNames.push(x)
    }
    return this.controlNames
  }

  isControlRequired(formGroup: FormGroup, controlName: string) {
    return formGroup.get(controlName)?.hasValidator(Validators.required)
  }

  formatLabel(controlName: string) {
    const mapper: Record<string, string> = {
      bvn: 'B.V.N',
      dob: 'D.O.B',
      bankcode: 'Bank Code',
      accountnumber: 'Account Number'
    }

    if (mapper[controlName]) return mapper[controlName]

    return controlName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
  }

  hasError(formGroup: FormGroup, controlName: string) {
    return this.isSubmitting && formGroup.get(controlName)?.invalid
  }

  onCreate(formGroup: FormGroup,) {
    this.isSubmitting = true
    if (formGroup.valid) {
      this.customerService.store(formGroup.value)
        .subscribe({
          next: () => {
            alert('Customer created successfully...')
            this.router.navigateByUrl('/customers')
          },
          error(err) {
            alert(`Error: ${err.error.message}`)
          },
        })
    }
  }

  onEdit(formGroup: FormGroup,) {
    //
  }

  setActiveCustomer(data: any) {
    this.activeCustomer = data
  }

  getActiveCustomer() {
    return this.activeCustomer
  }
}
