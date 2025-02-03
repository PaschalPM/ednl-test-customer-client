import { Component } from '@angular/core';
import { SettingsComponent } from '../../svgs/settings/settings.component';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../../svgs/overview/overview.component';
import { UserMultipleComponent } from '../../svgs/user-multiple/user-multiple.component';
import { UserGroupComponent } from '../../svgs/user-group/user-group.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css'
})
export class NavListComponent {
  navlist = [
    {
      text: 'Quick Action',
      link: '/quick-action',
      iconComponent: OverviewComponent
    },
    {
      text: 'Customers',
      link: '/customers',
      iconComponent: UserMultipleComponent
    },
    {
      text: 'Teams',
      link: '/teams',
      iconComponent: UserGroupComponent
    },
    {
      text: 'Settings',
      link: '/settings',
      iconComponent: SettingsComponent
    },
  ]

  constructor(private router: Router) { }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
