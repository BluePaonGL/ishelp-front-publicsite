import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateStatusComponent } from './candidate-status.component';

describe('CandidateStatusComponent', () => {
  let component: CandidateStatusComponent;
  let fixture: ComponentFixture<CandidateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
