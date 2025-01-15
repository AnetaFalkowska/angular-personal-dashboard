import { Injectable, OnDestroy } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
  bookmarks: Bookmark[] = [];
  storageListenSub: Subscription;

  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'bookmarks') {
        this.loadState();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find((b) => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    this.saveState();
  }

  updateBookmark(id: string, updatedFileds: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    if (bookmark) Object.assign(bookmark, updatedFileds);
    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkId = this.bookmarks.findIndex((b) => b.id === id);
    if (bookmarkId === -1) return;
    this.bookmarks.splice(bookmarkId, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const todosInLocalStorage = localStorage.getItem('bookmarks');
      const updatedTodos = todosInLocalStorage
        ? JSON.parse(todosInLocalStorage, (key, value) => {
            if (key === 'url') {
              return new URL(value);
            }
            return value;
          })
        : [];
      this.bookmarks.length = 0;
      this.bookmarks.push(...updatedTodos);
    } catch (err) {
      console.log('There was an error retrieving Bookmarks from local storage');
      console.log(err);
    }
  }
}
