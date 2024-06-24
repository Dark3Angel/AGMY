import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../data-access/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../data-access/user/user.service';
import { RegComponent } from '../reg/reg.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    standalone: true,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, NgIf, MatIconModule, MatButtonModule]
})
export class LoginComponent {
  constructor(public dialog: MatDialog, private authService : AuthService,private userService:UserService){ }

  public showPassword: boolean = false;
  mail: string | undefined;
  password: string | undefined;
  currentUser = this.authService.currentUserValue;
  formGroup!: FormGroup
  @Input() formError = '';
  user:any
  error:boolean=false

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openReg() { // открыть форму регистрации
    const dialogRef = this.dialog.open(RegComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit():void {
    this.formGroup = new FormGroup({
      mail: new FormControl('',[Validators.required, Validators.email]),
      pass: new FormControl('',[Validators.required])
  });
  }

  async log() { //кнопка логина
    this.mail =(<HTMLInputElement>document.getElementById("MailInput")).value;
    this.password =(<HTMLInputElement>document.getElementById("PassInput")).value;
    try {
      const data = this.authService.login(this.mail,this.password) // запрос на логин
      const response = await lastValueFrom(data)
      const user = this.userService.UserData(this.mail) // запрос на данные пользователя если прошел логин
      const userentity = await lastValueFrom(user)
      this.user = userentity
      //localStorage.setItem('pfpPath',this.user.pfp_path); // адрес картинки пользователя если прошел логин
      window.location.reload()
    } catch(err){
      this.error=true;
    }
  }


}
