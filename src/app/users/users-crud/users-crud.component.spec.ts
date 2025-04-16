import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCRUDComponent } from './users-crud.component';

describe('UsersCRUDComponent', () => {
  let component: UsersCRUDComponent;
  let fixture: ComponentFixture<UsersCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCRUDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
