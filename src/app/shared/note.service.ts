import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];
  storageListenSub: Subscription

  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe((event: StorageEvent) => {
      console.log(event)
      if (event.key==="notes") {
        console.log("yes")
        this.loadState()
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (!note) return;
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    // preventing app from crashing when error due to invalid JSON string
    try {
      const notesInLocalStorage = localStorage.getItem('notes');
    // When notesInLocalStorage changes, assigning it directly to this.notes creates a new array reference. 
    // This means that the existing notes array (referenced by components using the getNotes method) is not updated,
    // as the reference to the original array remains unchanged. 
    // To ensure the component view is updated, the original array (this.notes) must be modified directly 
    // (e.g., by clearing its contents and pushing new elements into it), instead of replacing the reference.
     // this.notes = notesInLocalStorage ? [...JSON.parse(notesInLocalStorage)] : [];
      this.notes.length = 0; //clear the notes array, while keeping the reference
      const updatedNotes = notesInLocalStorage ? [...JSON.parse(notesInLocalStorage)] : [];
      this.notes.push(...updatedNotes) // modifying the existing array
    } catch (err) {
      console.log('There was an error retrieving Notes fomr local storage');
      console.log(err);
    }
  }
}

