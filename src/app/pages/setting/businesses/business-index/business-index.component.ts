import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2SmartTableComponent, ServerDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-business-index',
  templateUrl: './business-index.component.html',
  styleUrls: ['./business-index.component.scss']
})
export class BusinessIndexComponent implements OnInit, AfterViewInit {

  source: ServerDataSource | any;
  pageSize = 20;
  pageNumber = 1;
  totalRecords = 0;
  listUrl = environment.apiurl + 'v1/business.php?_route=index';
  totalRows = 0;
  currentRows = 0;

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent | any;

  private baseRoute = 'v1/business.php';

  settings = {
    hideSubHeader: false,
    actions: {
      custom: [
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash text-danger" title="delete"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="fa fa-edit m-2" title="Edit"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      columnTitle: ''

    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: this.pageSize,
      page: this.pageNumber,
    },
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastrService: ToastrService,
    private _domSanitizer: DomSanitizer,
    private titleService: Title,
    private route: ActivatedRoute
  ) { 
    this.titleService.setTitle('Business');
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(async (params) => {
        const page = params['page'];
        if (page) {
          this.pageNumber = +page;
          this.settings.pager.page = this.pageNumber;
        }
      }
      );
    this.source = this.getData();
    this.source.onChanged().subscribe((change: any) => {
      if (change.action === 'page') {
        this.pageNumber = change.paging.page;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: this.pageNumber,
          },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  getData() {
    return this.apiService.getGridData(this.listUrl, this.pageSize, this.pageNumber);
  }

  ngAfterViewInit(): void {
    this.smartTable.custom.subscribe((dataObject: any) => {
      // console.log(dataObject);
      if (dataObject.action === 'editAction') {
        this.router.navigate(['/pages/businesses/update/' + dataObject.data.id], { queryParams: { indexPage: this.pageNumber } });
      } else if (dataObject.action === 'deleteAction') {
        if (window.confirm('Are you sure you want to delete?')) {
          this.delete(dataObject.data.id)
        }
      }
    });
  }

  delete(id: number): void {
    this.apiService.deleteRequest(this.baseRoute, {
      id: id,
      _route: 'delete'
    })
      .pipe(first())
      .subscribe(response => {
        if (response.body.status === 1) {
          this.toastrService.success('Business deleted successfully!');
          this.source = this.getData();
        } else {
          this.toastrService.error('Something went wrong. Please try again later!');
        }
      });
  }

}
