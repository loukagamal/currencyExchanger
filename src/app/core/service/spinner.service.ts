import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  // Use BehaviorSubject to hold the spinner state
  private spinnerSubject = new BehaviorSubject<boolean>(false);

  // Expose the spinner state as an Observable
  public spinnerState$ = this.spinnerSubject.asObservable();

  constructor() {}

  // Emit an event to show the spinner
  show() {
    setTimeout(() => {
      this.spinnerSubject.next(true);
    });
  }

  // Emit an event to hide the spinner
  hide() {
    setTimeout(() => {
      this.spinnerSubject.next(false);
    });
  }
}
