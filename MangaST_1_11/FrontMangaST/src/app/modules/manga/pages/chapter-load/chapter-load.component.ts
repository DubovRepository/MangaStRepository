import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chapter-load',
  templateUrl: './chapter-load.component.html',
  styleUrl: './chapter-load.component.scss'
})
export class ChapterLoadComponent {


  constructor(
    private router: Router,

  ) {
  }

}
