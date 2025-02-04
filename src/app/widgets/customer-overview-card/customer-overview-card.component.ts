import { Component, input } from '@angular/core';
import { VectorComponent } from '../../svgs/vector/vector.component';

@Component({
  selector: 'app-customer-overview-card',
  imports: [VectorComponent],
  template: `<div class="my-4 relative">
  <div class="w-60 p-4 border-1 border-gray-300 rounded-sm shadow-sm pl-8 relative z-1 bg-white">
      <div class="flex justify-between">
          <small>
              All Customers
          </small>
          <app-vector />
      </div>
      <div class="font-bold text-2xl">
          {{totalCustomers()}}
      </div>
  </div>
  <div class="w-56 p-4 border-1 border-gray-300 rounded-lg pl-8 absolute top-2 left-2 -bottom-1 z-0 shadow-md">
  </div>
</div>`
})
export class CustomerOverviewCardComponent {
  totalCustomers = input.required<number>()
}
