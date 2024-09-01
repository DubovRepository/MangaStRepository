import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaCatalogComponent } from './manga-catalog.component';

describe('MangaCatalogComponent', () => {
  let component: MangaCatalogComponent;
  let fixture: ComponentFixture<MangaCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangaCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangaCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
