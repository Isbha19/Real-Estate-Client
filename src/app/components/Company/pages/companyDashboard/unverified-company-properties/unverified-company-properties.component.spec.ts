import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedCompanyPropertiesComponent } from './unverified-company-properties.component';

describe('UnverifiedCompanyPropertiesComponent', () => {
  let component: UnverifiedCompanyPropertiesComponent;
  let fixture: ComponentFixture<UnverifiedCompanyPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnverifiedCompanyPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnverifiedCompanyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
