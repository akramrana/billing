import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss']
})
export class DeliveryViewComponent implements OnInit {

  id: number = 0;
  title: string = "";
  delivery: any;
  private baseRoute = 'v1/delivery.php';
  orderTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.title = 'View';
    this._route.params.subscribe((param) => {
      this.id = (param['id']) ? param['id'] : 0;
    });
    if (this.id) {
      this.getViewData();
    }
  }

  getViewData() {
    this.apiService.readRequest(this.baseRoute, {
      id: this.id,
      _route: "view"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        //console.log(_data);
        if (_data) {
          this.delivery = _data;
        }
      });
  }

  printInvoice() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    let orderItemData = [];
    // orderInfo
    orderItemData.push([
      {
        text: 'Delivery Summary',
        colSpan: 9,
        fontSize: 14,
        bold: true,
        style: {
          fillColor: '#1976d2',
          color: '#FFFFFF'
        },
        alignment: 'center'
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ])

    orderItemData.push([
      { text: 'Sr.', alignment: 'center', bold: true, fontSize: 11, style: { color: '#353935' } },
      { text: 'Description', alignment: 'left', bold: true, fontSize: 11, style: { color: '#353935' } },
      { text: 'Date', alignment: 'left', bold: true, fontSize: 11, style: { color: '#353935' } },
      { text: 'Order Number', alignment: 'left', bold: true, fontSize: 11, style: { color: '#353935' } },
      { text: 'Color', alignment: 'left', bold: true, fontSize: 11, style: { color: '#353935' } },
      { text: 'Size', alignment: 'left', bold: true, fontSize: 11, style: { color: '#353935' } },
      { text: 'Qty.', alignment: 'center', bold: true, fontSize: 11, color: '#353935' },
      { text: 'Price', alignment: 'right', bold: true, fontSize: 11, color: '#353935' },
      { text: 'Total', alignment: 'right', bold: true, fontSize: 11, color: '#353935' }
    ]);
    //
    let i = 0;
    let total: number = 0;
    for (let orderItem of this.delivery?.items) {
      i = i + 1;
      total += Number(orderItem.price) * Number(orderItem.quantity);
      let itemTtl: any = Number(orderItem?.price) * Number(orderItem?.quantity);
      let colourName = orderItem?.colour_name;
      let sizeName = orderItem?.size_name;
      let qtyStr = 'x' + orderItem?.quantity;
      let msg = orderItem.message;
      let datetime = orderItem.datetime;
      let order_number = orderItem.order_number;
      orderItemData.push([
        { text: i, alignment: 'center', fontSize: 11, style: { color: '#353935' } },
        { text: msg, alignment: 'left', fontSize: 11, style: { color: '#353935' } },
        { text: datetime, alignment: 'left', fontSize: 11, style: { color: '#353935' } },
        { text: order_number, alignment: 'left', fontSize: 11, style: { color: '#353935' } },
        { text: colourName, alignment: 'left', fontSize: 11, style: { color: '#353935' } },
        { text: sizeName, alignment: 'left', fontSize: 11, style: { color: '#353935' } },
        { text: qtyStr, fontSize: 11, color: '#353935' },
        { text: orderItem?.price, alignment: 'right', fontSize: 11, color: '#353935' },
        { text: Number(itemTtl).toFixed(3), alignment: 'right', fontSize: 11, color: '#353935' }
      ]);
    }
    this.orderTotal = total;
    // paymentInfo
    let paymentSummery: any[] = [];
    // addressInfo
    let address = 'Address: ';
    let phone = '';
    // main
    const documentDefinition: any = {
      pageSize: 'A4',
      content: [
        {
          style: 'table',
          alignment: 'center',
          margin: [0, 0, 0, 5],
          table: {
            widths: [129, 110, 100, 140],
            headerRows: 1,
            body: [
              [
                {
                  text: '',
                  alignment: 'left',
                  width: 30,
                  height: 30,
                  margin: [5, 6, 5, 5],
                  border: [false, false, false, false],
                },
                {
                  text: `Global Accessories`,
                  color: "#28282B",
                  alignment: 'center',
                  bold: true,
                  colSpan: 2,
                  margin: [0, 7, 0, 5],
                  fontSize: 23,
                  border: [false, false, false, false],
                },
                {},
                {
                  text: `Delivery Number. : ${this.delivery.delivery_number}`,
                  color: "#28282B",
                  alignment: 'right',
                  margin: [0, 15, 0, 0],
                  fontSize: 10,
                  border: [false, false, false, false],
                }],
            ]
          },
          layout: {
            hLineColor: function (i: any, node: any) {
              return (i === 0 || i === node.table.body.length || i === 1) ? 'black' : 'white';
            },
            vLineColor: function (i: any, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
          }
        },
        {
          style: 'table',
          alignment: 'center',
          margin: [0, 5, 0, 5],
          border: [false, false, false, false],
          table: {
            widths: [200, 89, 200],
            headerRows: 1,
            body: [
              [
                {
                  text: 'Delivery Statement',
                  colSpan: 3,
                  fontSize: 14,
                  bold: true,
                  style: {
                    fillColor: '#1976d2',
                    color: '#FFFFFF'
                  },
                  alignment: 'center',
                  border: [false, false, false, false]
                },
                {},
                {}
              ],
              [
                {
                  text: `Delivery Man: ${this.delivery.delivery_man}`,
                  bold: true,
                  fontSize: 11,
                  style: {
                    color: '#353935'
                  },
                  alignment: 'left',
                  border: [false, false, false, false]
                },
                {
                  text: '',
                  fontSize: 11,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
                {
                  text: ``,
                  fontSize: 11,
                  alignment: 'right',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
              ],
              [
                {
                  text: `Creation Date: ${this.delivery.created_at}`,
                  bold: true,
                  fontSize: 11,
                  style: {
                    color: '#353935'
                  },
                  alignment: 'left',
                  border: [false, false, false, false]
                },
                {
                  text: '',
                  fontSize: 11,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
                {
                  text: ``,
                  fontSize: 11,
                  alignment: 'right',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
              ],
              [
                {
                  text: ``,
                  bold: true,
                  fontSize: 11,
                  style: {
                    color: '#353935'
                  },
                  alignment: 'left',
                  border: [false, false, false, false]
                },
                {
                  text: '',
                  fontSize: 11,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
                {
                  text: '',
                  fontSize: 11,
                  alignment: 'right',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
              ],
            ]
          },
        },
        {
          style: 'table',
          alignment: 'center',
          margin: [0, 5, 0, 5],
          table: {
            widths: [30, 65, 60, 58, 40, 35, 35, 55, 55],
            headerRows: 1,
            body: orderItemData
          },
        },
        {
          style: 'table',
          alignment: 'right',
          margin: [265, 5, 0, 0],
          table: {
            widths: [122, 110, 100, 105],
            headerRows: 1,
            body: [
              [
                {
                  text: 'Payment Summary',
                  colSpan: 2,
                  fontSize: 14,
                  bold: true,
                  style: {
                    fillColor: '#1976d2',
                    color: '#FFFFFF'
                  }, alignment: 'center'
                },
                {}
              ],
              [
                {
                  text: 'Subtotal',
                  bold: true,
                  fontSize: 11,
                  style: {
                    color: '#353935'
                  },
                  alignment: 'left'
                },
                {
                  text: this.orderTotal + ' ' + 'BDT',
                  alignment: 'right',
                  margin: [0, 0, 0, 0]
                },
              ]
            ],
          },
        },
        {
          style: 'table',
          alignment: 'center',
          margin: [0, 50, 0, 5],
          border: [false, false, false, false],
          table: {
            widths: [200, 89, 200],
            headerRows: 1,
            body: [
              [
                {
                  text: '',
                  colSpan: 3,
                  fontSize: 14,
                  bold: true,
                  alignment: 'center',
                  border: [false, false, false, false]
                },
                {},
                {}
              ],
              [
                {
                  text: `Received By`,
                  bold: true,
                  fontSize: 11,
                  style: {
                    color: '#353935'
                  },
                  alignment: 'left',
                  border: [false, false, false, false]
                },
                {
                  text: 'Checked By',
                  fontSize: 11,
                  alignment: 'center',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
                {
                  text: 'Authorize Signature',
                  fontSize: 11,
                  alignment: 'right',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
              ],
              [
                {
                  text: ``,
                  bold: true,
                  fontSize: 11,
                  style: {
                    color: '#353935'
                  },
                  alignment: 'left',
                  border: [false, false, false, false]
                },
                {
                  text: '',
                  fontSize: 11,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
                {
                  text: '',
                  fontSize: 11,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false]
                },
              ],
            ]
          },
        },
      ],
      footer: {
        style: {
          fillColor: '#0066ae'
        },
        columns: [
          {
            text: 'Powered By Global Accessories',
            alignment: 'center',
            color: '#28282B',
            style: {
              fillColor: "#ffcc66"
            },
            fontSize: 12
          },
        ]
      },
    };
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition).open();
  }


}
