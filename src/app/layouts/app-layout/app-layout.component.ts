import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  imports: [],
  template: `
  <div class="m-auto py-2 text-gray-700 px-4">
    <ng-content></ng-content>
  </div>
`
})
export class AppLayoutComponent {

}
