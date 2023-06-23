import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPasswordComponent),
      multi: true
    }
  ]
})
export class FormPasswordComponent implements ControlValueAccessor{

  @Input() public inputPassword: FormControl = new FormControl();

  onChange : any;
  onTouch: any;

  _subscription: Subscription;

  ngOnInit(){
    this._subscription = this.inputPassword.valueChanges.subscribe(value => {
      if(this.onChange){
        this.onChange(value)
      }
    })
  }

  writeValue(value : any) {
    this.inputPassword.setValue(value)
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  ngOnDestroy(){
    this._subscription.unsubscribe()
  }


}
