import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from '../services/currency-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from 'src/app/core/models/currency.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/core/service/spinner.service';
import { Observable, forkJoin, observable, of, timer } from 'rxjs';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss'],
})
export class CurrencyDetailsComponent implements OnInit {
  result: number = 0;
  rate: string = '';
  from: string = '';
  amount:number=1;
  to: string = '';
  form: FormGroup = this._FormBuilder.group({
    from: [{ value: this.from, disabled: true }, , Validators.required],
    to: [this.to, Validators.required],
    amount: [1, Validators.required],
  });
  observable$: Array<Observable<any>> = [];
  currencySymbols: Currency[] = [];
  currencyDetails: string = '';
  isDisabled: boolean = true;
  chart: boolean = false;
  basicData: any;
  basicOptions: any;
  chartOptions: any;
  date = new Date();
  monthlyDate: any[] = [];
  reats: String[] = [];
  monthlySort: String[] = [];
  monthly = [
    { id: 1, name: 'January', value: 0 },
    { id: 2, name: 'February', value: 0 },
    { id: 3, name: 'March', value: 0 },
    { id: 4, name: 'April', value: 0 },
    { id: 5, name: 'May', value: 0 },
    { id: 6, name: 'June', value: 0 },
    { id: 7, name: 'July', value: 0 },
    { id: 8, name: 'August', value: 0 },
    { id: 9, name: 'September', value: 0 },
    { id: 10, name: 'October', value: 0 },
    { id: 11, name: 'November', value: 0 },
    { id: 12, name: 'December', value: 0 },
  ];
  searchDate: string[] = [];
  constructor(
    private currencyService: CurrencyServiceService,
    private _FormBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerSVR: SpinnerService
  ) {
    this.getSymbols();
    this.router.events.subscribe((event: any) => {
      event.NavigationStart ? this.patchForm() : '';
    });
  }

  ngOnInit(): void {
    this.spinnerSVR.show();
    this.patchForm();
    this.spinnerSVR.hide();
  }
  createForm(): void {
  }
  startDate: string = '';
  endDate: string = '';
  getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    let start_date = `${year - 1}-${month}-${day}`;
    let end_date = `${year}-${month}-${day}`;
    this.startDate = start_date;
    this.endDate = end_date;
  }
  convert() {
    this.monthlySort=[]
    this.monthlyDate=[]
    this.spinnerSVR.show();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.currencyService
        .getConvert(
          this.form.get('to')?.value,
          this.form.get('from')?.value,
          this.form.get('amount')?.value
        )
        .subscribe((res) => {
          this.result = res.result;
          this.rate = res?.info?.rate;
        });
    }
    this.getRates()
    this.spinnerSVR.hide();
  }
  getSymbols() {
    this.currencyService.getSymbols().subscribe((res) => {
      this.currencySymbols = this.currencyService.convertObjToArray(
        res.symbols
      );
      this.from ? this.getDetails(this.from) : '';
    });
  }
  symbolToChange(event: string) {
    this.rate = '';
    this.router.navigate([
      `/dashboard/currency-details/${this.form.get('from')?.value}/to/${event}`,
    ]);
  }
  symbolFromChange(event: string) {
    this.rate = '';
    this.result = 0;
    this.getDetails(event);
  }

  getDetails(name: string) {
    let detailsCurrency: any = this.currencySymbols?.find(
      (item) => item.name == name);
    this.currencyDetails = detailsCurrency?.details? detailsCurrency?.details: '';
    }
  exchangerSymbol() {
    let from = this.form.get('from')?.value;
    let to = this.form.get('to')?.value;
    this.form.get('from')?.patchValue(to);
    this.form.get('to')?.patchValue(from);
  }
  patchForm() {
    const from = this.route.snapshot.paramMap.get('from');
    const to = this.route.snapshot.paramMap.get('to');
    const amount = this.route.snapshot.paramMap.get('amount');
    this.from = from ? from : 'EUR';
    this.to = to ? to : 'USD';
    this.amount = amount ? parseInt(amount) : 1;
    this.form?.get('from')?.patchValue(this.from);
    this.form?.get('to')?.patchValue(this.to);
    this.form?.get('amount')?.patchValue(this.amount);
  }
  getRates() {
    this.spinnerSVR.show();
    let today = new Date();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.monthly.forEach((item, i) => {
      this.getLastDayOfThatMonth(yyyy, mm - i, i);
    });
  }

  getLastDayOfThatMonth(yyyy: number, mm: number, i: number) {
    console.log(yyyy,mm,i);
    
    var date = new Date(yyyy, mm - 1, 0);
    var year = date.getFullYear();
    var monthNum = String(date.getMonth() + 1);
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    let searchDate = `${year}-${month}-${day}`;
    this.searchDate.push(searchDate);
    this.sortMonthlyName(monthNum);
    if (i == 11) {
      this.findreats();
    }
    console.log(searchDate);

    return searchDate
  }

  findreats() {
    this.spinnerSVR.show();
    const calls: Array<Observable<any>> = [];
    this.searchDate.forEach((element) => {
      calls.push(this.currencyService.getRates(element, this.to, this.from));
    });
    const Observable = forkJoin(calls).subscribe({
      next: (value: any[]) => {
        this.monthlyDate = value.map((item) =>
          this.currencyService.convertObjToString(item.rates)
        );
      },
      complete: () => {
        this.drawChart();
        this.spinnerSVR.hide();
      },
    });

  }

  sortMonthlyName(monthNum: string) {
    let monthly = this.monthly.find(
      (item) => String(item.id) === monthNum
    )?.name;
    let monthlyName = monthly ? monthly : '';
    this.monthlySort.push(monthlyName);
  }

  drawChart() {
    const observable = forkJoin(this.observable$);

    this.monthlyDate = this.monthlyDate.sort(function (a, b) {
      return b.date - a.date;
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = 'rgb(20, 48, 175)';
    const textColorSecondary = 'white';
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: this.monthlySort.reverse(),
      datasets: [
        {
          label: `${this.from}/${this.to}`,
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.monthlyDate.reverse(),
        },
      ],
    };
    this.basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
    observable.subscribe({
      next: (value) => {},
      complete: () => {
        this.chart = true;
        this.spinnerSVR.hide();
      },
    });
  }
}
