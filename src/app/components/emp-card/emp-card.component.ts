import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-card',
  templateUrl: './emp-card.component.html',
  styleUrls: ['./emp-card.component.scss'],
})
export class EmpCardComponent  implements OnInit {
  @Input() url:string='';
  @Input() name:string='';
  @Input() contry:string='';
  @Input() job:string='';


  constructor() { }

  ngOnInit() {}
 
}
