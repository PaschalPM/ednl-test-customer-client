import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';
import { HeadingComponent } from '../../../components/heading/heading.component';


@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule, CommonModule, HeadingComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  customerFormGroup!: FormGroup
  controlNames: string[] = []
  isSubmitting = false

  constructor(
    private readonly fb: FormBuilder,
    private readonly customerService: CustomersService,
    private readonly router: Router
  ) {
    this.customerFormGroup = this.fb.group({
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
      drivers_licence: [''],
    })

    this.setControlNames()
  }

  setControlNames() {
    for (let x in this.customerFormGroup.controls) {
      this.controlNames.push(x)
    }
  }

  isControlRequired(controlName: string) {
    return this.customerFormGroup.get(controlName)?.hasValidator(Validators.required)
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

  hasError(controlName: string) {
    return this.isSubmitting && this.customerFormGroup.get(controlName)?.invalid
  }
  onCreate() {
    this.isSubmitting = true
    if (this.customerFormGroup.valid) {
      this.customerService.store(this.customerFormGroup.value)
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
}
