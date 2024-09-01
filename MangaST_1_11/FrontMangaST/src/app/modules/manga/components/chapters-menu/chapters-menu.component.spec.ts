import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersMenuComponent } from './chapters-menu.component';

describe('ChaptersMenuComponent', () => {
  let component: ChaptersMenuComponent;
  let fixture: ComponentFixture<ChaptersMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaptersMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChaptersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
