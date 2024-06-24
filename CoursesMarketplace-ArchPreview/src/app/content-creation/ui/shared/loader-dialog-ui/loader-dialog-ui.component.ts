import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader-dialog-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './loader-dialog-ui.component.html',
  styleUrl: './loader-dialog-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderDialogUiComponent { }
