import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserBtnComponent } from './create-user-btn.component';

describe('CreateUserBtnComponent', () => {
  let component: CreateUserBtnComponent;
  let fixture: ComponentFixture<CreateUserBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
