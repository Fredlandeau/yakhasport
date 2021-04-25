import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;

  constructor() {}

  ngOnInit(): void {
    // this.getData();
  }


}
