import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '../../constants/globals';

type PaginatedCustomerResource = {
  data: any,
  links: any,
  meta: {
    current_page: number,
    last_page: number,
    total: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private readonly http: HttpClient) { }

  // ?page_size=2&search_text=ku&page=2
  getPaginatedCustomers(pageSize = 50, page = 1, searchText = '') {
    return this.http.get<PaginatedCustomerResource>(apiUrlFactory('/customers',
      {
        page_size: pageSize.toString(),
        page: page.toString(),
        search_text: searchText
      }))
  }

  store(data: any) {
    return this.http.post(apiUrlFactory('/customers'), data)
  }
}
