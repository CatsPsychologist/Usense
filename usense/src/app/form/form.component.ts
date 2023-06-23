import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {PasswordStrengthService} from "../shared/services/password-strength.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public form: FormGroup;

  public formText: string = 'Please, type your password to make sure it\'s enough secure';
  public firstIndicator: string = '#cecece';
  public secondIndicator: string = '#cecece';
  public thirdIndicator: string = '#cecece';

  protected indicatorArr: string[] = []

  private _subscription : Subscription;

  constructor(
    private passwordService: PasswordStrengthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(){
    this.buildForm();

    this.form.controls['password'].valueChanges .pipe(
        debounceTime(250)
      ).subscribe(inputValue => {

        this.indicatorArr = this.passwordService.checkPassword(inputValue)

        this.firstIndicator = this.indicatorArr[0];
        this.secondIndicator = this.indicatorArr[1];
        this.thirdIndicator = this.indicatorArr[2];

      })

  }

  buildForm() {
    this.form = this.formBuilder.group({
      password: new FormControl('')
    })
  }

  ngOnDestroy(){
    this._subscription.unsubscribe()
  }
}
