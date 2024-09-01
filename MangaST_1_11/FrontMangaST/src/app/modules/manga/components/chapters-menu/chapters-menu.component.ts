import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {ChapterControllerService} from "../../../../services/services/chapter-controller.service";
import {ChapterResponse} from "../../../../services/models/chapter-response";
import {MangaResponse} from "../../../../services/models/manga-response";


@Component({
  selector: 'app-chapters-menu',
  templateUrl: './chapters-menu.component.html',
  styleUrl: './chapters-menu.component.scss'
})
export class ChaptersMenuComponent implements OnInit{


  constructor(
    private mangaService: MangaControllerService,
    private chapterService: ChapterControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  //chapterNumber: number | undefined;
  isError = false;
  index: number | undefined;


  @Input()
  currentChapter: ChapterResponse = {};

  @Input()
  listChaptersByManga: Array<ChapterResponse> = [];

  @Input()
  mangaPageId = '';

  @Input()
  manga: MangaResponse = {};


  ngOnInit(): void {


    //this.loadAllChapters();
    //this.loadCurrentChapter();

  }
/*
  loadParameters() {
    this.isError = false;
    this.mangaPageId = this.activatedRoute.snapshot.params['mangaPageId'];
    this.chapterNumber = this.activatedRoute.snapshot.params['chapterNumber'];
  } */

  /*
  loadCurrentChapterAndIndex() {
    for (let i = 0; i < this.listChaptersByManga.length; i++) {
      if(this.listChaptersByManga[i].number == this.chapterNumber) {
        this.currentChapter = this.listChaptersByManga[i];
        this.index = i;
        break;
      }
    }
  }
  */

  /*
  loadAllChapters() {
    this.loadParameters();

    this.chapterService.findAllChaptersByPageId({
      pageId: this.mangaPageId
    }).subscribe({
      next: (chapters) => {
        this.listChaptersByManga = chapters;


        this.loadCurrentChapterAndIndex();


        const testLinkRef = `.link-number-${this.currentChapter.number}`
        let testLink = document.querySelector(testLinkRef);
        if(testLink != null && typeof(testLink) != 'undefined') {
            testLink.classList.add('active');
        }


      },
      error: (err) => {
        this.isError = true;
      }
    });
  } */

  /*
  loadCurrentChapter() {
    const tmpLink = `.chap_${this.chapterNumber}`;
    let link = document.querySelector(tmpLink);
    if(link != null && typeof(link) != 'undefined') {
      link.classList.add('active')
    }
    //this.chapterService.findAllChaptersByMangaId()
    for (let i = 0; i < this.listChaptersByManga.length; i++) {
      if(this.listChaptersByManga[i].number == this.chapterNumber) {
        this.currentChapter = this.listChaptersByManga[i];
        this.index = i;
        break;
      }
    }



    this.chapterService.findChapterByNumberAndMangaPageId({
      chapterNumber: this.chapterNumber as number,
      pageId: this.mangaPageId
    }).subscribe({
      next: (chapter) => {
        this.currentChapter = chapter;
        this.selectNumber = chapter.number as number;
      }
    });

  } */


  testMethod() {
    var el = document.getElementById('selectlink_ul');
    if(el != null)
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }


  /*
  previousChapter() {
    if(typeof(this.index) != 'undefined') {
      if (this.index > 0) {
        --this.index
        this.router.navigate([`/mangaPage/${this.mangaPageId}/v1/${this.listChaptersByManga[this.index].number}`]);
        this.loadParameters();
        this.loadCurrentChapter();
      }
    }
  } */

  /*
  nextChapter() {
    if (typeof (this.index) != 'undefined') {
      if (this.index == this.listChaptersByManga.length - 1) {
        this.router.navigate([`/mangaPage/${this.mangaPageId}`]);
      } else {
        ++this.index;
        this.router.navigate([`/mangaPage/${this.mangaPageId}/v1/${this.listChaptersByManga[this.index].number}`]);
        this.loadParameters();
        this.loadCurrentChapter();
      }
    }
  } */


  toChange(number: number | undefined) {
    if(number != null && typeof(number) != 'undefined') {
      this.router.navigate([`mangaPage/${this.mangaPageId}/v1/${number}`])
    }
  }
}
