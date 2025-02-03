import { Routes } from '@angular/router';
import { IndexComponent as CustomersIndexComponent } from './pages/customers/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnderConstructionComponent } from './widgets/under-construction/under-construction.component';
import { QuickActionComponent } from './pages/quick-action/quick-action.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SettingsComponent } from './pages/settings/settings.component'

export const routes: Routes = [
    {
        path: 'customers',
        component: CustomersIndexComponent
    },
    {
        path: 'quick-action',
        component: QuickActionComponent
    },
    {
        path: 'teams',
        component: TeamsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: '*',
        component: NotFoundComponent
    }
];
