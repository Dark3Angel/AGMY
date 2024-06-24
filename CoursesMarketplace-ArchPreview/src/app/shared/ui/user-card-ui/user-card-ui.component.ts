import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-user-card-ui',
    templateUrl: './user-card-ui.component.html',
    styleUrls: ['./user-card-ui.component.less'],
    standalone: true,
    imports: [MatMenuModule, MatDividerModule, RouterLink, MatIconModule]
})
export class UserCardUiComponent implements OnChanges {

  pfp:any

  @Input() user:any;

  @Output() LogOut = new EventEmitter<boolean>();

  Logout(){
    this.LogOut.emit(true)
  }

  initpfp(){
    this.pfp = "http://localhost:3000/user/images" + this.user?.pfp_path;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'].currentValue != undefined) { // данные получены
      this.initpfp()
    }
  }

}
