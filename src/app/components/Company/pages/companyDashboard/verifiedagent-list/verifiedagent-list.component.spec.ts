import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedagentListComponent } from './verifiedagent-list.component';

describe('VerifiedagentListComponent', () => {
  let component: VerifiedagentListComponent;
  let fixture: ComponentFixture<VerifiedagentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifiedagentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifiedagentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
