import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-manage-bookmarks',
  imports: [RouterOutlet, NgFor, RouterModule],
  templateUrl: './manage-bookmarks.component.html',
  styleUrl: './manage-bookmarks.component.scss'
})
export class ManageBookmarksComponent implements OnInit {
bookmarks:Bookmark[] = []

constructor(private bookmarkService:BookmarkService) {

}

ngOnInit(): void {
  this.bookmarks = this.bookmarkService.getBookmarks()
}
}
