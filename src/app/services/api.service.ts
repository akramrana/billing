import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseRoute = 'v1';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getGridData(listUrl: string, pageSize: number, pageNumber: number) {
    return new ServerDataSource(this.http,
      {
        dataKey: 'data',
        endPoint: listUrl,
        totalKey: 'total'
      });
  }

  readRequest(route: string, getParams?: any) {
    return this.configService.readRequest(route, getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  postRequest(route: string, getParams?: any, postParams?: any) {
    return this.configService.postRequest(route, getParams, postParams)
      .pipe(map(response => {
        return response;
      }));
  }

  deleteRequest(route: string, getParams?: any) {
    return this.configService.deleteRequest(route, getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  putRequest(route: string, getParams?: any, postParams?: any) {
    return this.configService.putRequest(route, getParams, postParams)
      .pipe(map(response => {
        return response;
      }));
  }

}
