import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['userData'];
    this.mainUser = resolvedData.data;

    this.editUserFormGroup = new FormGroup({
      firstName: new FormControl(this.mainUser.firstName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      lastName: new FormControl(this.mainUser.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      fatherName: new FormControl(this.mainUser.fatherName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      userName: new FormControl(this.mainUser.userName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      mobileNumber: new FormControl(this.mainUser.mobileNumber, [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
      ]),
      organizationId: new FormControl(1, []),
      nationalCode: new FormControl(this.mainUser.nationalCode, [
        Validators.required,
        nationalCodeValidator()
      ]),
      identifyNumber: new FormControl('', []),
      isForeigner: new FormControl(this.mainUser.isForeigner, []),
    });

    console.log('this.userID:', this.userID);
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
      })
      .pipe(
        catchError((err: any) => {
          this._snackBar.open(err.message);

          return of(null);
        })
      )
      .subscribe((res) => {
        if (res !== null) {
          this._snackBar.open('کاربر با موفقیت ویرایش شد', undefined, {
            duration: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/users']);
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
