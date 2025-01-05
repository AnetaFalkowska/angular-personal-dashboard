import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {


  bookmarks:Bookmark[] = [new Bookmark("Wikipedia", "https://pl.wikipedia.org/"), new Bookmark("YouTube", "https://www.youtube.com/"), new Bookmark("example", "https://example.com/")]

  getBookmarks() {
return this.bookmarks
  }

  getBookmark(id:string) {
    return this.bookmarks.find(b=>b.id === id)
  }

  addBookmark(bookmark:Bookmark) {
this.bookmarks.push(bookmark)
  }

  updateBookmark(id:string, updatedFileds:Partial<Bookmark>) {
const bookmark = this.getBookmark(id)
if (bookmark)
Object.assign(bookmark, updatedFileds)
  }

  deleteBookmark(id:string) {
    const bookmarkId = this.bookmarks.findIndex(b=>b.id === id)
    if (bookmarkId===-1) return
    this.bookmarks.splice(bookmarkId, 1)
  }

  constructor() { }
}
