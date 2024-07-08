import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardNavbarComponent } from './company-dashboard-navbar.component';

describe('CompanyDashboardNavbarComponent', () => {
  let component: CompanyDashboardNavbarComponent;
  let fixture: ComponentFixture<CompanyDashboardNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashboardNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
