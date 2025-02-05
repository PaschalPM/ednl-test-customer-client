import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CustomersService } from '../../../services/api/customers.service';
import { CustomerFormService } from '../../../services/form/customer-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormLayoutComponent } from '../../../layouts/form-layout/form-layout.component';

@Component({
  selector: 'app-show',
  imports: [FormLayoutComponent, ReactiveFormsModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  customerFormGroup!: FormGroup
  controlNames: string[] = []
  title = ''
  customerData: any

  private destroy$ = new Subject<void>()

  constructor(
    public readonly customerFormService: CustomerFormService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly customersApiService: CustomersService
  ) {
    this.customerFormGroup = this.customerFormService.getFormGroup()
    this.setControlNames()
    this.syncCustomerDataAndSetTitle()
  }

  syncCustomerDataAndSetTitle() {
    const customerId = this.route.snapshot.params['id']
    this.customerFormService.retrieveCustomerData(customerId, (customerData) => {
      this.customerData = customerData
      this.setTitleAndFormGroup()
    })
  }

  setControlNames() {
    this.customerFormService.setControlNames(this.customerFormGroup, this.controlNames)
  }

  formatLabel(controlName: string) {
    return this.customerFormService.formatLabel(controlName)
  }

  private setTitleAndFormGroup() {
    this.title = `${this.customerData.firstname}'s Profile`

    for (let key in this.customerData) {
      this.customerFormGroup.patchValue({ [key]: this.customerData[key] })
    }
  }

  onEditClicked(params: any) {
    this.router.navigateByUrl(`/customers/edit/${this.customerData.id}`)
    this.customerFormService.setActiveCustomer(this.customerData)
  }

  onDeleteClicked(ev: any) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersApiService.deleteCustomer(this.customerData.id)
        .subscribe(v => {
          alert("Customer deleted successfully")
          this.router.navigateByUrl(`/customers`)
        })
    }
  }

  ngOnDestroy(): void {
    this.customerFormService.resetActiveCustomer()
    this.destroy$.next()
    this.destroy$.complete()
  }
}
