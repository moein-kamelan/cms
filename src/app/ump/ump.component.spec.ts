import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpComponent } from './ump.component';

describe('UmpComponent', () => {
  let component: UmpComponent;
  let fixture: ComponentFixture<UmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
