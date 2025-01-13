import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NgIf } from '@angular/common';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.scss',
})
export class EditBookmarkComponent implements OnInit {
  bookmark?: Bookmark;

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      if (bookmarkId)
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
    });
  }

  onFormSubmit(form: NgForm) {
    if (this.bookmark) {
      const { name, url } = form.value;
      this.bookmarkService.updateBookmark(this.bookmark.id, {name, url:new URL(url)});
      // this.router.navigateByUrl('/bookmarks');
    }
    this.notificationService.show('Bookmark updated!')

  }

  deleteBookmark() {
    if (this.bookmark)
    this.bookmarkService.deleteBookmark(this.bookmark.id)
    this.router.navigate(['../'], {relativeTo: this.route});
    this.notificationService.show('Deleted Bookmark!')
  }
}
