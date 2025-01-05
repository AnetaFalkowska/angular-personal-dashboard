import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-add-bookmark',
  imports: [FormsModule, RouterModule],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.scss',
})
export class AddBookmarkComponent {
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router
  ) {}

  onFormSubmit(form: NgForm) {
    const {name, url} = form.value
    const bookmark = new Bookmark(name, url)
    this.bookmarkService.addBookmark(bookmark);
    this.router.navigateByUrl('/bookmarks');
  }
}