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
import { AddPersonComponent } from '../../../svgs/add-person/add-person.component';
import { VectorComponent } from '../../../svgs/vector/vector.component';
import { CustomerOverviewCardComponent } from '../../../widgets/customer-overview-card/customer-overview-card.component';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-index',
  imports: [AgGridAngular, RouterModule, SearchInputComponent, HeadingComponent, AddPersonComponent, VectorComponent, CustomerOverviewCardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnDestroy {
  gridApi!: GridApi
  columnDefs: ColDef[] = [
    {
      headerName: 'Actions',
      cellRenderer() {
        return `
        <button class='cursor-pointer hover:scale-120 transition'>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5l4 4-12 12h-4v-4l12-12z"></path>
          </svg>
          </button>
          `
      },
      width: 50
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
      field: 'created_at'
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
    private readonly router: Router
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
              params.successCallback(value.data, value.meta.total)
            },
            error(err) {
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
      this.router.navigateByUrl(`/customers/edit/${ev.data.id}`)
      this.customerFormService.setActiveCustomer(ev.data)
    }
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

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
