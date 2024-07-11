import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedAgentListComponent } from './unverified-agent-list.component';

describe('UnverifiedAgentListComponent', () => {
  let component: UnverifiedAgentListComponent;
  let fixture: ComponentFixture<UnverifiedAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnverifiedAgentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnverifiedAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
