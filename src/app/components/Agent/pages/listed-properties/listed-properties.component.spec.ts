import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedPropertiesComponent } from './listed-properties.component';

describe('ListedPropertiesComponent', () => {
  let component: ListedPropertiesComponent;
  let fixture: ComponentFixture<ListedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
