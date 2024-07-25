import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPropertyFormComponent } from './sold-property-form.component';

describe('SoldPropertyFormComponent', () => {
  let component: SoldPropertyFormComponent;
  let fixture: ComponentFixture<SoldPropertyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldPropertyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldPropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
