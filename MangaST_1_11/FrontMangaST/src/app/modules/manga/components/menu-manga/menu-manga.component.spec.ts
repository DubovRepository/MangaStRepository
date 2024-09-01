import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMangaComponent } from './menu-manga.component';

describe('MenuMangaComponent', () => {
  let component: MenuMangaComponent;
  let fixture: ComponentFixture<MenuMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuMangaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
