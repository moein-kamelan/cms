import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFeildComponent } from './form-feild.component';

describe('FormFeildComponent', () => {
  let component: FormFeildComponent;
  let fixture: ComponentFixture<FormFeildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFeildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
