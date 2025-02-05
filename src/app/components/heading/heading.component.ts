import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [],
  template: `<h1 class="text-[#0053A6] font-bold text-xl">{{text()}}</h1>`
})
export class HeadingComponent {
  text = input.required<string>()
}
