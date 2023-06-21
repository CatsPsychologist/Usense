import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usense';

  public inputForm: FormControl = new FormControl();
  public passwordStrength: number = 1;
  public firstIndicator: string = '#cecece';
  public secondIndicator: string = '#cecece';
  public thirdIndicator: string = '#cecece';

  protected easy = /[a-zA-Z]/;
  protected mid = /\d+/ ;
  protected strong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

  private _subscription : Subscription;

  ngOnInit(){

    this._subscription = this.inputForm.valueChanges
      .pipe(
      debounceTime(250)
    ).subscribe(value => {

        if (value.length >= 8 && (value.match(this.easy) || value.match(this.mid) || value.match(this.strong))){

          this.firstIndicator = '#fd8686';
          this.secondIndicator = this.thirdIndicator = '#cecece';
          this.passwordStrength = 3;
        }

        if (value.length >= 8 &&  ((value.match(this.easy) && value.match(this.mid)) ||
                                   (value.match(this.mid)  && value.match(this.strong)) ||
                                   (value.match(this.easy) && value.match(this.strong)) )){

          this.firstIndicator = this.secondIndicator = '#ffff98';
          this.thirdIndicator = '#cecece';
          this.passwordStrength = 4;
        }

        if (value.length >= 8 && (value.match(this.easy) && value.match(this.mid) && value.match(this.strong))){

          this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#93ff93'
          this.passwordStrength = 5;
        }

        value.length < 8 ? this.passwordStrength = 2 : this.passwordStrength;
        value === '' ? this.passwordStrength = 1 : this.passwordStrength;

        if (this.passwordStrength === 1){ this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#cecece' }
        if (this.passwordStrength === 2){ this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#fd8686' }
      })
  }

  ngOnDestroy(){
    this._subscription.unsubscribe()
  }
}
