import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedCompaniesComponent } from './verified-companies.component';

describe('VerifiedCompaniesComponent', () => {
  let component: VerifiedCompaniesComponent;
  let fixture: ComponentFixture<VerifiedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifiedCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifiedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
