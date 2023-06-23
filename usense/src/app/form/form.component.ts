import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {PasswordStrengthService} from "../shared/services/password-strength.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public formControl: FormControl = new FormControl();
  public formText: string = 'Please, type your password to make sure it\'s enough secure';
  public firstIndicator: string = '#cecece';
  public secondIndicator: string = '#cecece';
  public thirdIndicator: string = '#cecece';

  protected indicatorArr: string[] = []

  private _subscription : Subscription;

  constructor(
    private passwordService: PasswordStrengthService,
  ) {}

  ngOnInit(){

    this._subscription = this.formControl.valueChanges
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
