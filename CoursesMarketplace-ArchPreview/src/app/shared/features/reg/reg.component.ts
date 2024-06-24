import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../data-access/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.less'],
    standalone: true,
    imports: [
      NgIf,
      ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule]
})
export class RegComponent {
  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
  public showPassword: boolean = false;
  public show2Password: boolean = false;
  done: boolean = false

  public togglePasswordVisibility(): void { //иконка пароля
    this.showPassword = !this.showPassword;
  }

  public toggle2PasswordVisibility(): void { //иконка проверки пароля
    this.show2Password = !this.show2Password;
  }

  @Input() formError = '';


  ngOnInit(): void { }

  RegForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
    secondpass: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    secondname: new FormControl('', [Validators.required]),
    role: new FormControl('student')
  });


  async reg() {
    const data = this.authService.register(
      this.RegForm.value.name!,
      this.RegForm.value.secondname!,
      this.RegForm.value.mail!,
      this.RegForm.value.pass!,
      this.RegForm.value.role!
    )
    const response = await lastValueFrom(data)
    this.done = true //добавить вывод об успешной регистрации
    window.location.reload()
  }

}
