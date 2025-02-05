import { Component, input, output } from '@angular/core';
import { HeadingComponent } from '../../components/heading/heading.component';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';

@Component({
  selector: 'app-form-layout',
  imports: [HeadingComponent, AppLayoutComponent, NgSwitch, NgSwitchCase, ActionButtonComponent],
  template: `
  <app-app-layout>
      @if(title()){
        <div class="mt-2 mb-6 flex justify-between items-center">
          <app-heading [text]="title()" />

          <ng-container [ngSwitch]="type()">
            <div *ngSwitchCase="'view'" class="space-x-2 flex">
              <app-action-button type="edit" (handleClick)="handleEdit.emit($event)"/>
              <app-action-button type="delete" (handleClick)="handleDelete.emit($event)"/>
            </div>
            <div *ngSwitchCase="'edit'" class="space-x-2">
              <app-action-button type="delete" (handleClick)="handleDelete.emit($event)"/>
            </div>
          </ng-container>
        </div>

        <ng-content></ng-content>
      }
      @else {
        Loading...
      }

  </app-app-layout>
    `
})
export class FormLayoutComponent {
  title = input.required<string>()
  type = input<string>('')

  handleEdit = output<Event>()
  handleDelete = output<Event>()
}
