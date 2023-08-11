import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/core/models/currency.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
@Input() rate!:Currency;
@Input() from !:string;
}
