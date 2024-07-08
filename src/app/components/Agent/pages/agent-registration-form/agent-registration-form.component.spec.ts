import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegistrationFormComponent } from './agent-registration-form.component';

describe('AgentRegistrationFormComponent', () => {
  let component: AgentRegistrationFormComponent;
  let fixture: ComponentFixture<AgentRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRegistrationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
