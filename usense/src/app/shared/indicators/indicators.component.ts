import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent {

  @Input() public firstColor: string = '#cecece';
  @Input() public secondColor: string = '#cecece';
  @Input() public thirdColor: string = '#cecece';

}
