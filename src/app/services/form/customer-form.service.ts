import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { CustomersService } from '../api/customers.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService implements OnDestroy {
  private isSubmitting = false
  private activeCustomer: any
  private destroy$ = new Subject<void>()

  constructor(
    private readonly customerApiService: CustomersService,
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

  retrieveCustomerData(customerId: string, cb: (customerData: any) => void) {
    const customerData = this.getActiveCustomer()
    if (!customerData) {
      this.customerApiService.getCustomerById(customerId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((v: any) => {
          cb(v.data)
        })
    }
    else {
      cb(customerData)
    }

  }

  setControlNames(formGroup: FormGroup, controlNames: string[]) {
    for (let x in formGroup.controls) {
      controlNames.push(x)
    }
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


  onCreate(formGroup: FormGroup) {
    this.onMutate(formGroup, 'create', this.customerApiService.storeCustomer(formGroup.value))
  }

  onUpdate(formGroup: FormGroup, id: number) {
    this.onMutate(formGroup, 'update', this.customerApiService.updateCustomer(formGroup.value, id))
  }

  setActiveCustomer(data: any) {
    this.activeCustomer = data
  }

  getActiveCustomer() {
    return this.activeCustomer
  }

  resetActiveCustomer() {
    this.activeCustomer = null
  }

  resetIsSubmitting() {
    this.isSubmitting = false
  }

  private onMutate(formGroup: FormGroup, type: 'create' | 'update', customerApiFunc: Observable<Object>) {
    this.isSubmitting = true

    if (formGroup.valid) {
      customerApiFunc
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            alert(`Customer ${type === 'create' ? 'created' : 'updated'} successfully...`)
            this.router.navigateByUrl('/customers')
          },
          error(err) {
            alert(`Error: ${err.error.message}`)
          },
        })
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
