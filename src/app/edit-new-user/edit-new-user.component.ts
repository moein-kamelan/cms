import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UsersService } from '../services/users.service';
import { Subscription, catchError, of } from 'rxjs';
import { ActionButtonComponent } from '../shared/action-button/action-button.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { InputFeildComponent } from '../shared/input-feild/input-feild.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { nationalCodeValidator } from '../validators/national-code.validator';

@Component({
  selector: 'app-edit-new-user',
  imports: [
    ErrorMessageComponent,
    MaterialModule,
    RouterModule,
    ActionButtonComponent,
    BackButtonComponent,
    InputFeildComponent,
  ],
  templateUrl: './edit-new-user.component.html',
  styleUrl: './edit-new-user.component.css',
})
export class EditNewUserComponent implements OnInit, OnDestroy {
  private _snackBar = inject(MatSnackBar);

  mainUser: any = {};
  userID: string | null = null;
  editUserFormGroup!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router , 
    private fb : FormBuilder
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['userData'];
    this.mainUser = resolvedData.data;

    this.editUserFormGroup = this.fb.group({
      firstName: [this.mainUser.firstName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      lastName: [this.mainUser.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      fatherName: [this.mainUser.fatherName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      userName: [this.mainUser.userName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      mobileNumber: [this.mainUser.mobileNumber, [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
        Validators.maxLength(11)
      ]],
      organizationId: [1, [Validators.maxLength(5)]],
      nationalCode: [this.mainUser.nationalCode, [
        Validators.required,
        nationalCodeValidator(),
        Validators.maxLength(10)
      ]],
      identifyNumber: ['', [Validators.maxLength(5)]],
      isForeigner: [this.mainUser.isForeigner, []],
    });

  }

  updataeUserSub!: Subscription;
  onSubmitEditUserForm() {
    console.log(
      'this.editUserFormGroup.value => ',
      this.editUserFormGroup.value
    );
    this.updataeUserSub = this.usersService
      .UpdateUserPersonalInformation({
        ...this.editUserFormGroup.value,
        id: this.userID,
      }).subscribe((res) => {
        if (res) {
          this._snackBar.open('کاربر با موفقیت ویرایش شد', undefined, {
            duration: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/users/info']);
          }, 2000);
        }
      });
  }

  getEditUserFormControl(controlName: string) {
    return this.editUserFormGroup.get(controlName) as FormControl;
  }

  ngOnDestroy(): void {
    this.updataeUserSub?.unsubscribe();
  }
}
