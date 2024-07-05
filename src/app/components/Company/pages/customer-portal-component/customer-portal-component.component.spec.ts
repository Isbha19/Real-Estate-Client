import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortalComponentComponent } from './customer-portal-component.component';

describe('CustomerPortalComponentComponent', () => {
  let component: CustomerPortalComponentComponent;
  let fixture: ComponentFixture<CustomerPortalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPortalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPortalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
