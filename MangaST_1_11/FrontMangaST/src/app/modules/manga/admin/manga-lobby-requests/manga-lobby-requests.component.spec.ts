import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaLobbyRequestsComponent } from './manga-lobby-requests.component';

describe('MangaLobbyRequestsComponent', () => {
  let component: MangaLobbyRequestsComponent;
  let fixture: ComponentFixture<MangaLobbyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangaLobbyRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangaLobbyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
