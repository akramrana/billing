import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseRoute = 'v1';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

}
