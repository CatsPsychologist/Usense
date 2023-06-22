import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  public passwordStrength: number = 1;
  public firstIndicator: string = '#cecece';
  public secondIndicator: string = '#cecece';
  public thirdIndicator: string = '#cecece';

  protected easy = /[a-zA-Z]/;
  protected mid = /\d+/ ;
  protected strong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

  constructor() { }

  checkPassword(password : string){
    if (password.length >= 8 && (password.match(this.easy) || password.match(this.mid) || password.match(this.strong))){

      this.firstIndicator = '#fd8686';
      this.secondIndicator = this.thirdIndicator = '#cecece';
      this.passwordStrength = 3;
    }

    if (password.length >= 8 &&  ((password.match(this.easy) && password.match(this.mid)) ||
      (password.match(this.mid)  && password.match(this.strong)) ||
      (password.match(this.easy) && password.match(this.strong)) )){

      this.firstIndicator = this.secondIndicator = '#ffff98';
      this.thirdIndicator = '#cecece';
      this.passwordStrength = 4;
    }

    if (password.length >= 8 && (password.match(this.easy) && password.match(this.mid) && password.match(this.strong))){

      this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#93ff93'
      this.passwordStrength = 5;
    }

    password.length < 8 ? this.passwordStrength = 2 : this.passwordStrength;
    password === '' ? this.passwordStrength = 1 : this.passwordStrength;

    if (this.passwordStrength === 1){ this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#cecece' }
    if (this.passwordStrength === 2){ this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#fd8686' }

    return [this.firstIndicator, this.secondIndicator, this.thirdIndicator]
  }
}
