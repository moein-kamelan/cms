import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTableBtnComponent } from './refresh-table-btn.component';

describe('RefreshTableBtnComponent', () => {
  let component: RefreshTableBtnComponent;
  let fixture: ComponentFixture<RefreshTableBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreshTableBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshTableBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
