import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMainDashboardComponent } from './company-main-dashboard.component';

describe('CompanyMainDashboardComponent', () => {
  let component: CompanyMainDashboardComponent;
  let fixture: ComponentFixture<CompanyMainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyMainDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
