import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedCompaniesComponent } from './unverified-companies.component';

describe('UnverifiedCompaniesComponent', () => {
  let component: UnverifiedCompaniesComponent;
  let fixture: ComponentFixture<UnverifiedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnverifiedCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnverifiedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
