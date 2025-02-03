import { NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div
      
    >
      <div class="text-center">
        <h1
          class="text-9xl font-bold"
        >
          404
        </h1>
        <p
          class='text-2xl font-semibold text-base-content/70 mt-4'
        >
          Oops! Page Not Found
        </p>
    
        <a
          routerLink="/"
          class="mt-6 inline-block px-5 py-3 bg-accent text-sm text-accent-content uppercase font-medium rounded hover:bg-accent/80"
        >
          Go back home
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {

}
