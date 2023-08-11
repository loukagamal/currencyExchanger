import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from '../services/currency-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Currency } from 'src/app/core/models/currency.model';
import { SpinnerService } from 'src/app/core/service/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private currencyService: CurrencyServiceService,
    private _FormBuilder: FormBuilder,
    private router: Router,
    private spinnerSVR: SpinnerService,

  ) {}
  currencySymbols: Currency[]=[];
  result = 0;
  rate: string = '';
  rates :Currency[]=[]
  form!: FormGroup;
  animation: boolean=false;
  latestSymbols='USD,EUR,EGP,KWD,BHD,OMR,GBP,CHF,AED'
  ngOnInit(): void {
    this.getSymbols();
    this.createForm();
    this.convert()
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      from: ['EUR', Validators.required],
      to: ['USD', Validators.required],
      amount: [1, Validators.required],
    });
  }
  convert() {
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
          this.getLates()
        });
    }

  }
  getSymbols() {
    this.currencyService
      .getSymbols()
      .subscribe(
        (res) =>(
          this.currencySymbols = this.currencyService.convertObjToArray(res.symbols)
          )
      );
  }
  details() {
    this.router.navigate([
      `/dashboard/currency-details/${this.form.get('from')?.value}/to/${
        this.form.get('to')?.value
      }`,
    ]);
  }
  symbolToChange(){
    this.rate=''
  }
  symbolFromChange(){
    this.rate='';
    this.result=0;
  }
  exchangerSymbol(){
    let from   =this.form.get('from')?.value;
    let to = this.form.get('to')?.value ;    
    this.form.get('from')?.patchValue(to) ;
    this.form.get('to')?.patchValue(from) ;
  }
  getLates(){
    this.currencyService.getLatest(this.latestSymbols , this.form.get('from')?.value).subscribe(res=>{
      this.rates=this.currencyService.convertObjToArray(res.rates)      
      this.spinnerSVR.hide();
    })
  }
}
