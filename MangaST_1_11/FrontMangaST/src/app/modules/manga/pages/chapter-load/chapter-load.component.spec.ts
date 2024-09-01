import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLoadComponent } from './chapter-load.component';

describe('ChapterLoadComponent', () => {
  let component: ChapterLoadComponent;
  let fixture: ComponentFixture<ChapterLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapterLoadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
