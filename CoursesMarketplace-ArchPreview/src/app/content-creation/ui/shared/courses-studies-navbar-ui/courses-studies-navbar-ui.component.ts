import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-courses-studies-navbar-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './courses-studies-navbar-ui.component.html',
  styleUrl: './courses-studies-navbar-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesStudiesNavbarUiComponent { }
