import {Component, Input} from '@angular/core';
import {CommentResponse} from "../../../../services/models/comment-response";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  private _comment: CommentResponse = {};

  get comment(): CommentResponse {
    return this._comment;
  }

  @Input()
  set comment(value: CommentResponse) {
    this._comment = value;
  }



}
