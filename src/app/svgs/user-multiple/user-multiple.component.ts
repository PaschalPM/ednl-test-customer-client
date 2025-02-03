import { Component } from '@angular/core';
import { BaseSvgComponent } from '../base-svg/base-svg.component';

@Component({
  selector: 'app-user-multiple',
  imports: [],
  template: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.4104 13.3333H12.7372C13.5037 13.3333 14.1135 12.9841 14.6609 12.4957C16.0517 11.2551 12.7824 10 11.6663 10M10.333 3.37919C10.4844 3.34916 10.6416 3.33334 10.8029 3.33334C12.0161 3.33334 12.9997 4.22878 12.9997 5.33334C12.9997 6.43791 12.0161 7.33334 10.8029 7.33334C10.6416 7.33334 10.4844 7.31754 10.333 7.28748" [attr.stroke]="stroke()" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M2.98754 10.7408C2.20156 11.162 0.140759 12.0221 1.39592 13.0983C2.00906 13.624 2.69194 14 3.55048 14H8.44953C9.30807 14 9.99094 13.624 10.6041 13.0983C11.8593 12.0221 9.79847 11.162 9.01247 10.7408C7.16933 9.75307 4.83066 9.75307 2.98754 10.7408Z" [attr.stroke]="stroke()" stroke-width="1.5"/>
  <path d="M8.66634 5.00001C8.66634 6.47277 7.47241 7.66668 5.99967 7.66668C4.52691 7.66668 3.33301 6.47277 3.33301 5.00001C3.33301 3.52725 4.52691 2.33334 5.99967 2.33334C7.47241 2.33334 8.66634 3.52725 8.66634 5.00001Z" [attr.stroke]="stroke()" stroke-width="1.5"/>
  </svg>
  `,
})
export class UserMultipleComponent extends BaseSvgComponent {

}
