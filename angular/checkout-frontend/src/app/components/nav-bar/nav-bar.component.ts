import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'rd-nav-bar',
    templateUrl: './nav-bar.component.html',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule],
    standalone: true
})
export class RDNavBarComponent {
    title = 'checkout-frontend';

    constructor(private router: Router) {

    }

    goHome() {
        this.router.navigate(['']);
    }
}
