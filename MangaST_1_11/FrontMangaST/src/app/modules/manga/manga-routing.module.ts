import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainMangaComponent} from "./pages/main-manga/main-manga.component";
import {MangaListComponent} from "./pages/manga-list/manga-list.component";
import {AccountComponent} from "./pages/account/account.component";
import {MangaCatalogComponent} from "./pages/manga-catalog/manga-catalog.component";
import {MangaPageComponent} from "./pages/manga-page/manga-page.component";
import {TestPageComponent} from "./pages/test-page/test-page.component";
import {authGuard} from "../../servicesT/guard/auth.guard";
import {AdminPanelComponent} from "./admin/admin-panel/admin-panel.component";
import {AdminManageComponent} from "./admin/admin-manage/admin-manage.component";
import {CheckRequestComponent} from "./admin/check-request/check-request.component";
import {MangaLobbyRequestsComponent} from "./admin/manga-lobby-requests/manga-lobby-requests.component";
import {ChapterPageComponent} from "./pages/chapter-page/chapter-page.component";


const routes: Routes = [
  {
    path: '',
    component: MainMangaComponent,
    children: [
      {
        //Главная страница
        path: '',
        component: MangaListComponent
      },
      {
        //Личный кабинет
        path: 'account',
        component: AccountComponent,
        canActivate: [authGuard]
      },
      {
        //Каталог
        path: 'manga-catalog',
        component: MangaCatalogComponent
      },
      {
        //Страница манги
        path: 'mangaPage/:mangaPageId',
        component: MangaPageComponent
      },
      {
        //Для пользователя просмотр главы
        path: 'mangaPage/:mangaPageId/v1/:chapterNumber',
        component: ChapterPageComponent
      },
      {
        //Доделать (добавление глав от игроков [запрос])
        path: 'mangaPage/:pageId/add',
        //component: ChapterLoadComponent,
        component: MangaPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'test',
        component: TestPageComponent,
        canActivate: [authGuard]
      },
      {
        //Админ панель
        path: 'admin-panel',
        component: AdminPanelComponent,
        canActivate: [authGuard]
      },
      {
        //Раздел для добавления/редактирования манги
        path: 'admin-panel/manage',
        component: AdminManageComponent,
        canActivate: [authGuard]
      },
      {
        //Редактрирование/добавлени конкретной манги
        path: 'admin-panel/manage/:mangaPageId',
        component: AdminManageComponent,
        canActivate: [authGuard]
      },
      {
        //Проверка запросов (лобби)
        path: 'admin-panel/check-requests',
        component: CheckRequestComponent,
        canActivate: [authGuard]
      },
      {
        //Список всех запросов в определенной манге
        path: 'admin-panel/check-requests/:mangaPageId',
        //path: 'admin-panel/check-request/:mangaPageId/idChapter',
        //component: CheckRequestComponent, --> компонент должен быть тот что, что и при открытии главы
        //Как различать когда проверка, а когда просто чтение? Проверка по параметру в url, если есть
        //то например поставим isChecked = true;
        component: MangaLobbyRequestsComponent,
        canActivate: [authGuard]
      },
      {
        //Проверка конкретного запроса
        path: 'admin-panel/check-requests/:mangaPageId/:chapterId',
        component: ChapterPageComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangaRoutingModule { }
