import { Component } from '@angular/core';
import { BaseSvgComponent } from '../base-svg/base-svg.component';

@Component({
  selector: 'app-user-group',
  imports: [],
  template: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.8493 12C15.3489 12 15.7462 11.6857 16.1029 11.2461C16.8333 10.3463 15.6342 9.6272 15.1769 9.27507C14.712 8.91707 14.1929 8.71427 13.6667 8.66667M13 7.33333C13.9205 7.33333 14.6667 6.58714 14.6667 5.66667C14.6667 4.74619 13.9205 4 13 4" [attr.stroke]="stroke()" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M3.15097 12C2.65143 12 2.25411 11.6857 1.89735 11.2461C1.16705 10.3463 2.36611 9.6272 2.82342 9.27507C3.28831 8.91707 3.80738 8.71427 4.33366 8.66667M4.66699 7.33333C3.74652 7.33333 3.00033 6.58714 3.00033 5.66667C3.00033 4.74619 3.74652 4 4.66699 4" [attr.stroke]="stroke()" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6.38953 10.0741C5.70834 10.4953 3.92231 11.3554 5.01013 12.4316C5.54151 12.9573 6.13334 13.3333 6.87741 13.3333H11.1233C11.8673 13.3333 12.4591 12.9573 12.9905 12.4316C14.0783 11.3554 12.2923 10.4953 11.6111 10.0741C10.0137 9.08641 7.98687 9.08641 6.38953 10.0741Z" [attr.stroke]="stroke()" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.3337 4.99999C11.3337 6.28866 10.289 7.33332 9.00034 7.33332C7.71167 7.33332 6.66699 6.28866 6.66699 4.99999C6.66699 3.71132 7.71167 2.66666 9.00034 2.66666C10.289 2.66666 11.3337 3.71132 11.3337 4.99999Z" [attr.stroke]="stroke()" stroke-width="1.5"/>
  </svg>
  `,
})
export class UserGroupComponent extends BaseSvgComponent {

}
