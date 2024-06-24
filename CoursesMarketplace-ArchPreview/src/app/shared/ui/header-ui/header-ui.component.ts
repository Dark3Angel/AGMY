import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserCardUiComponent } from '../user-card-ui/user-card-ui.component';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

export interface TagsModel {
  primarytag?: string
  secondarytag?: string
}

@Component({
    selector: 'app-header-ui',
    templateUrl: './header-ui.component.html',
    styleUrls: ['./header-ui.component.less'],
    standalone: true,
    imports: [RouterLink, MatMenuModule, MatIconModule, NgIf, UserCardUiComponent]
})
export class HeaderUiComponent implements OnChanges {
  constructor() { }

  @Input() loggedIn: boolean = false;

  @Input() User: any;

  @Output() OpenLogin = new EventEmitter<boolean>();

  @Output() TagsSearch = new EventEmitter<TagsModel>();

  @Output() QuerySearch = new EventEmitter<string>();

  @Output() Logout = new EventEmitter<boolean>();

  role:boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['User'].currentValue != undefined) { // данные получены
      this.User.role == 'teacher' ? this.role = true : this.role = false
    }
  }

  LoggingOut(flag:boolean){
    if(flag==true){
      this.Logout.emit(true)
    }
  }

  login() {
    this.OpenLogin.emit(true)
  }

  Tags(primarytag?: string, secondarytag?: string) {
    const tags: TagsModel = {
      primarytag: primarytag,
      secondarytag: secondarytag
    }
    this.TagsSearch.emit(tags)
  }

  Query() {
    const query = (<HTMLInputElement>document.getElementById("SearchInput")).value;
    this.QuerySearch.emit(query)
  }

  timedOutCloser: any;

  mouseEnter(trigger: any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger: any) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 100);
  }

}
