import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationComponent } from './test-registration.component';

describe('TestRegistrationComponent', () => {
  let component: TestRegistrationComponent;
  let fixture: ComponentFixture<TestRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
