import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  catalog: Number[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) { this.catalog.push(i); }
  }
}
