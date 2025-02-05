import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DeleteComponent } from '../../svgs/delete/delete.component';
import { EditComponent } from '../../svgs/edit/edit.component';

@Component({
  selector: 'app-grid-action-btn',
  imports: [DeleteComponent, EditComponent],
  templateUrl: 'grid-action-btn.component.html',
})
export class GridActionBtnComponent implements ICellRendererAngularComp {
  private params: any

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  onBtnClicked(event: any, type: 'edit' | 'delete') {
    if (this.params.onEditBtnClicked instanceof Function) {
      const params = {
        event,
        rowData: this.params.data
      }

      if (type === 'edit') {
        this.params.onEditBtnClicked(params)
      }
      else {
        this.params.onDeleteBtnClicked(params)
      }
    }
  }

}
