import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bookmark-tile',
  imports: [NgIf],
  templateUrl: './bookmark-tile.component.html',
  styleUrl: './bookmark-tile.component.scss'
})
export class BookmarkTileComponent implements OnInit {

@Input() bookmark?:Bookmark

tileIconSrc:string = ''
faviconError:boolean = false

ngOnInit() {
  this.tileIconSrc = this.bookmark?.url.origin + "/favicon.ico"
}
}
