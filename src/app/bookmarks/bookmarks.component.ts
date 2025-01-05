import { Component, OnInit } from '@angular/core';
import { BookmarkTileComponent } from '../bookmark-tile/bookmark-tile.component';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  imports: [BookmarkTileComponent, NgFor, RouterModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent implements OnInit{


  bookmarks:Bookmark[] = []

  constructor(private bookmarkService:BookmarkService) {

  }

ngOnInit() {
this.bookmarks = this.bookmarkService.getBookmarks()
}

}
