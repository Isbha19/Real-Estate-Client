import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersChattedCardComponent } from './members-chatted-card.component';

describe('MembersChattedCardComponent', () => {
  let component: MembersChattedCardComponent;
  let fixture: ComponentFixture<MembersChattedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersChattedCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembersChattedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
