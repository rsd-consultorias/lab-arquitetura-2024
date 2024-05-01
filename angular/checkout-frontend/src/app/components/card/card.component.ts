import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'rd-cards',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [MatButtonModule, MatCardModule],
    standalone: true
})
export class RDCardComponent {
}