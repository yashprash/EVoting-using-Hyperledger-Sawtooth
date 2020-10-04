import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingScreenComponent } from './voting-screen.component';

describe('VotingScreenComponent', () => {
  let component: VotingScreenComponent;
  let fixture: ComponentFixture<VotingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
