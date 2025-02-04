import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./widgets/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customer-client';

  constructor(private readonly router: Router) {

  }
  ngOnInit(): void {
    this.router.navigateByUrl('/customers')
  }
}
