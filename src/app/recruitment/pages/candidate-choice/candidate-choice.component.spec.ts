import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateChoiceComponent } from './candidate-choice.component';

describe('CandidateChoiceComponent', () => {
  let component: CandidateChoiceComponent;
  let fixture: ComponentFixture<CandidateChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
