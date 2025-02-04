import { Component, OnDestroy } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions, GridReadyEvent, IGetRowsParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { RouterModule } from '@angular/router';
import { of, Subject, takeUntil, distinctUntilChanged, debounceTime, BehaviorSubject } from 'rxjs';
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

  constructor(private readonly customersService: CustomersService) { }


  ngOnInit(): void {
    this.setupDatasource()
    this.searchListener()
    this.getTotalCustomers()
  }

  getTotalCustomers() {
    this.customersService.getPaginatedCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => this.totalCustomers = v.meta.total)
  }

  setupDatasource() {
    this.datasource = {
      getRows: (params: IGetRowsParams) => {

        const pageSize = params.endRow - params.startRow
        const pageNumber = params.startRow / pageSize + 1;

        this.customersService.getPaginatedCustomers(pageSize, pageNumber, this.searchText)
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
