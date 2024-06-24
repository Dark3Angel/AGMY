import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/features/header/header.component';
import { FooterUiComponent } from './shared/ui/footer-ui/footer-ui.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    standalone: true,
    imports: [RouterOutlet,HeaderComponent,FooterUiComponent,MatDialogModule]
})
export class AppComponent {
  title = 'CoursesMarketplace';
}
