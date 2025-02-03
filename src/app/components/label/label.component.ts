import { Component } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  template: `
    <div class="flex gap-1.5 items-center font-semibold">
        <div class="size-8 bg-green-500 rounded-full "> </div>
        <span> My company </span>
    </div>
  `,
})
export class LabelComponent {

}
