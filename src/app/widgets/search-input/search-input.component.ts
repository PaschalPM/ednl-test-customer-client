import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  template: `

    @if(small()){
      
    <input
  type="text"
  [placeholder]="placeholder()"
  (input)="search.emit($event)"
  class="my-2 w-1/3 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
/>
    }

    @else {
      <div class="relative  max-w-[350px] w-6xl my-2">
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M15 10A5 5 0 1010 15a5 5 0 005-5z" />
              </svg>
              <input type="search" [placeholder]="placeholder()" (input)="search.emit($event)"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          }
  `,
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent {

  placeholder = input<string>('')
  small = input<boolean>(false)
  search = output<Event>()

}
