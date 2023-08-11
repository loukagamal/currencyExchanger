import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { CurrencyServiceService } from '../services/currency-service.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
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
    expect(service.getConvert).toBeTruthy();
   });

});
