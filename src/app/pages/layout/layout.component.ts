import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/core/service/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  showSpinner = false;
  constructor(  public spinnerService: SpinnerService ){}
  ngAfterViewInit(): void {
    this.spinnerService.spinnerState$.subscribe((state) => {
      this.showSpinner = state;
    });
  }
}
