import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMangaComponent } from './main-manga.component';

describe('MainMangaComponent', () => {
  let component: MainMangaComponent;
  let fixture: ComponentFixture<MainMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMangaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
