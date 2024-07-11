import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDBSidebarComponent } from './company-dbsidebar.component';

describe('CompanyDBSidebarComponent', () => {
  let component: CompanyDBSidebarComponent;
  let fixture: ComponentFixture<CompanyDBSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDBSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDBSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
