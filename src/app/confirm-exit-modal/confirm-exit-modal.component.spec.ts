import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExitModalComponent } from './confirm-exit-modal.component';

describe('ConfirmExitModalComponent', () => {
  let component: ConfirmExitModalComponent;
  let fixture: ComponentFixture<ConfirmExitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmExitModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmExitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
