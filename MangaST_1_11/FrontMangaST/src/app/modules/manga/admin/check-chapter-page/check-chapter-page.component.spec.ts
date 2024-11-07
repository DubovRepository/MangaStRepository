import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckChapterPageComponent } from './check-chapter-page.component';

describe('CheckChapterPageComponent', () => {
  let component: CheckChapterPageComponent;
  let fixture: ComponentFixture<CheckChapterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckChapterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckChapterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
