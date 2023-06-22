import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {PasswordStrengthService} from "./shared/services/password-strength.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usense';

  public inputForm: FormControl = new FormControl();

  public firstIndicator: string = '#cecece';
  public secondIndicator: string = '#cecece';
  public thirdIndicator: string = '#cecece';

  protected indicatorArr: string[] = []

  private _subscription : Subscription;

  constructor(
    private passwordService: PasswordStrengthService,
  ) {}

  ngOnInit(){

    this._subscription = this.inputForm.valueChanges
      .pipe(
      debounceTime(250)
    ).subscribe(inputValue => {

      this.indicatorArr = this.passwordService.checkPassword(inputValue)

      this.firstIndicator = this.indicatorArr[0];
      this.secondIndicator = this.indicatorArr[1];
      this.thirdIndicator = this.indicatorArr[2];

      })
  }

  ngOnDestroy(){
    this._subscription.unsubscribe()
  }
}
