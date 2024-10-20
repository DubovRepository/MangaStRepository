import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { MainMangaComponent } from './pages/main-manga/main-manga.component';
import { MenuMangaComponent } from './components/menu-manga/menu-manga.component';
import { MangaCardComponent } from './components/manga-card/manga-card.component';
import { MangaListComponent } from './pages/manga-list/manga-list.component';
import { MangaCatalogComponent } from './pages/manga-catalog/manga-catalog.component';
import { MangaPageComponent } from './pages/manga-page/manga-page.component';

import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { TestPageComponent } from './pages/test-page/test-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChapterCardComponent } from './components/chapter-card/chapter-card.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminManageComponent } from './admin/admin-manage/admin-manage.component';
import { CheckRequestComponent } from './admin/check-request/check-request.component';
import { MangaLobbyRequestsComponent } from './admin/manga-lobby-requests/manga-lobby-requests.component';
import { ChaptersMenuComponent } from './components/chapters-menu/chapters-menu.component';
import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { ChapterLoadComponent } from './pages/chapter-load/chapter-load.component';
import { RatingComponent } from './components/rating/rating.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
    declarations: [
        MainMangaComponent,
        MenuMangaComponent,
        MangaCardComponent,
        MangaListComponent,
        MangaCatalogComponent,
        MangaPageComponent,
        TestPageComponent,
        ChapterCardComponent,
        AdminPanelComponent,
        AdminManageComponent,
        CheckRequestComponent,
        MangaLobbyRequestsComponent,
        ChaptersMenuComponent,
        ChapterPageComponent,
        ChapterLoadComponent,
        RatingComponent,
        CommentComponent,
    ],
    exports: [
        MangaCardComponent
    ],
    imports: [
        PdfViewerModule,
        CommonModule,
        FormsModule,
        MangaRoutingModule
    ],
  providers: [
    HttpClient,
  ]
})
export class MangaModule { }
