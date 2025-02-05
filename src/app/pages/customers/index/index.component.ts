import { Component, OnDestroy } from '@angular/core';
import { CustomersService as CustomersApiService } from '../../../services/api/customers.service';
import { CustomerFormService } from '../../../services/form/customer-form.service';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent, IGetRowsParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, distinctUntilChanged, debounceTime, BehaviorSubject } from 'rxjs';
import { SearchInputComponent } from '../../../widgets/search-input/search-input.component';
import { HeadingComponent } from '../../../components/heading/heading.component';
import { CustomerOverviewCardComponent } from '../../../widgets/customer-overview-card/customer-overview-card.component';
import { GridActionBtnComponent } from '../../../components/grid-action-btn/grid-action-btn.component';
import { AppLayoutComponent } from '../../../layouts/app-layout/app-layout.component';
import { ActionButtonComponent } from '../../../components/action-button/action-button.component';
import { UtilsService } from '../../../services/utils.service';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-index',
  imports: [
    AppLayoutComponent,
    AgGridAngular,
    RouterModule,
    SearchInputComponent,
    HeadingComponent,
    CustomerOverviewCardComponent,
    ActionButtonComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnDestroy {
  gridApi!: GridApi
  columnDefs: ColDef[] = [
    {
      headerName: 'Actions',
      cellRenderer: GridActionBtnComponent,
      cellRendererParams: {
        onEditBtnClicked: this.onEditClicked.bind(this),
        onDeleteBtnClicked: this.onDeleteClicked.bind(this)
      },
      width: 100
    },
    {
      field: 'firstname',
      headerName: 'Name',
      valueGetter(params) {
        if (params.data) {
          const firstName = params.data.firstname
          const lastName = params.data.lastname
          return `${firstName} ${lastName}`
        }
        return '...'
      },

    },
    {
      field: 'email'
    },
    {
      field: 'telephone',
      headerName: 'Phone Number'
    },
    {
      field: 'state',
    },
    {
      headerName: 'Joined At',
      field: 'created_at',
      valueFormatter: (params) => {
        return params.data && this.utils.getDateFormatter().format(new Date(params.data.created_at))
      }
    }
  ]
  datasource: any
  searchText = ''
  searchText$ = new BehaviorSubject('')
  totalCustomers = 0

  private destroy$ = new Subject<void>()

  constructor(
    private readonly customersApiService: CustomersApiService,
    private readonly customerFormService: CustomerFormService,
    private readonly router: Router,
    private readonly utils: UtilsService
  ) { }


  ngOnInit(): void {
    this.setupDatasource()
    this.searchListener()
    this.getTotalCustomers()
  }

  getTotalCustomers() {
    this.customersApiService.getPaginatedCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => this.totalCustomers = v.meta.total)
  }

  setupDatasource() {
    this.datasource = {
      getRows: (params: IGetRowsParams) => {

        const pageSize = params.endRow - params.startRow
        const pageNumber = params.startRow / pageSize + 1;

        this.customersApiService.getPaginatedCustomers(pageSize, pageNumber, this.searchText)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (value) => {
              if (value.data.length === 0) {
                this.gridApi.showNoRowsOverlay()
              }
              else {
                this.gridApi.hideOverlay()
              }
              params.successCallback(value.data, value.meta.total)
            },
            error() {
              params.failCallback()
            }
          })
      }
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
  }

  onSearch(ev: any) {
    this.searchText$.next(ev.target.value)
  }

  onCellClicked(ev: any) {
    if (ev.colDef.headerName === 'Actions') {
      return
    }
    const customerId = ev.data.id
    this.router.navigateByUrl(`/customers/${customerId}`)
    this.customerFormService.setActiveCustomer(ev.data)
  }

  searchListener() {
    this.searchText$
      .pipe(distinctUntilChanged(), debounceTime(500), takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.searchText = value
          this.gridApi && this.gridApi.purgeInfiniteCache()
        },
      })
  }

  onEditClicked(params: any) {
    this.router.navigateByUrl(`/customers/edit/${params.rowData.id}`)
    this.customerFormService.setActiveCustomer(params.rowData)
  }

  onDeleteClicked(params: any) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersApiService.deleteCustomer(params.rowData.id)
        .subscribe(v => {
          this.gridApi.purgeInfiniteCache()
          this.getTotalCustomers()
        })
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
