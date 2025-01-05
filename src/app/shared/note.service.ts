import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [ new Note("Sample note","This is content"), new Note("Second note","hihihihihi")];

  constructor() {}

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (!note) return
    Object.assign(note, updatedFields)
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id)
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1)
  }

}
