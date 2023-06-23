import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.css']
})
export class FormPasswordComponent {

  @Input() public inputPassword: FormControl = new FormControl();


}
