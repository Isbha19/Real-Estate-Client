import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegCTAComponent } from './agent-reg-cta.component';

describe('AgentRegCTAComponent', () => {
  let component: AgentRegCTAComponent;
  let fixture: ComponentFixture<AgentRegCTAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRegCTAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentRegCTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
