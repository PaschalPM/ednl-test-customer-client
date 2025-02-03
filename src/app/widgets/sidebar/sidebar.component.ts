import { Component } from '@angular/core';
import { LabelComponent } from "../../components/label/label.component";
import { NavListComponent } from "../../components/nav-list/nav-list.component";

@Component({
  selector: 'app-sidebar',
  imports: [LabelComponent, NavListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
