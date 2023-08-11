import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDetailsComponent } from './currency-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyServiceService } from '../services/currency-service.service';

describe('CurrencyDetailsComponent', () => {
  let component: CurrencyDetailsComponent;
  let fixture: ComponentFixture<CurrencyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyDetailsComponent]
    });
    fixture = TestBed.createComponent(CurrencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('myService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [CurrencyServiceService]
  }));

   it('should be created', () => {
    const service: CurrencyServiceService = TestBed.get(CurrencyServiceService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: CurrencyServiceService = TestBed.get(CurrencyServiceService);
    expect(service.getConvert('eur','eur',1)).toBeTruthy();
   });

});