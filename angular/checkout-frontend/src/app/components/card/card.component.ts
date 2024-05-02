import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'rd-cards',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [MatButtonModule, MatCardModule],
    standalone: true
})
export class RDCardComponent {
    constructor(private router: Router) { }

    checkout() {
        this.router.navigate(['checkout']);
    }
}