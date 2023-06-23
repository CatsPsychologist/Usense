import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  public firstIndicator: string = '#cecece';
  public secondIndicator: string = '#cecece';
  public thirdIndicator: string = '#cecece';

  protected easy = /[a-zA-Z]/;
  protected mid = /\d+/ ;
  protected strong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

  constructor() { }

  checkPassword(password : string){

    if (password.length < 8) this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#fd8686'
    if (password === '') this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#cecece'

    if (password.length >= 8 && (password.match(this.easy) || password.match(this.mid) || password.match(this.strong))){

      this.firstIndicator = '#fd8686';
      this.secondIndicator = this.thirdIndicator = '#cecece';
    }

    if (password.length >= 8 &&
      ((password.match(this.easy) && password.match(this.mid)) ||
      (password.match(this.mid)  && password.match(this.strong)) ||
      (password.match(this.easy) && password.match(this.strong)) )){

      this.firstIndicator = this.secondIndicator = '#ffff98';
      this.thirdIndicator = '#cecece';
    }

    if (password.length >= 8 && (password.match(this.easy) && password.match(this.mid) && password.match(this.strong))){

      this.firstIndicator = this.secondIndicator = this.thirdIndicator = '#93ff93'
    }

    return [this.firstIndicator, this.secondIndicator, this.thirdIndicator]
  }
}
