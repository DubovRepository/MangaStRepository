import { Component } from '@angular/core';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {
  private _testUrl: undefined | string;


  get testUrl(): string | undefined {
    return './uploads/manga/1/chapters/test.pdf';;
  }
}
