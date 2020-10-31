import { AfterContentInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  Element as StripeElement,
  ElementOptions,
  ElementsOptions,
  StripeService
} from '@nomadreservations/ngx-stripe';
import { PaymentRequestButtonStyle, RequestElementOptions } from 'projects/ngx-stripe/src/lib/interfaces/element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  error: any;
  stripeKey;
  keyError = 'Must be a valid publishable test key (e.g. beings with pk_test_)';
  complete = false;
  element: StripeElement;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#276fd3',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  requestOptions: RequestElementOptions = {
    country: 'US',
    currency: 'usd',
    requestPayerName: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestShipping: true,
    total: {
      amount: 10000,
      label: 'Donate to the things'
    }
  };

  styles: PaymentRequestButtonStyle = {
    type: 'donate',
    theme: 'light',
    height: '64px'
  };

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  token: any = {};

  constructor(private _stripe: StripeService, private _dialog: MatDialog) {
    this._stripe.changeKey('pk_test_51HhubLIkRCVjhNhAZwcZUywqDXi4hV1ZTlnajARoh2Y3cQZjZMyWjeIjy3tJzZC3400sNsIKe0YjfZgdYCHtytMM00uUNpGXpJ')
  }

  ngAfterContentInit() {
  }

  cardUpdated(result) {
    this.element = result.element;
    this.complete = result.complete;
    this.error = undefined;
  }

  getCardToken() {
    console.log(this.element)
    this._stripe
      .createToken(this.element, {
        name: 'tested_ca',
        address_line1: '123 A Place',
        address_line2: 'Suite 100',
        address_city: 'Irving',
        address_state: 'BC',
        address_zip: 'VOE 1H0',
        address_country: 'CA'
      })
      .subscribe(result => {
        this.token = result;
        console.log(result)
      });
  }
}