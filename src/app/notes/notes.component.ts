import { Component, OnInit,  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NgFor } from '@angular/common';
import { NoteCardComponent } from "../note-card/note-card.component";


@Component({
  selector: 'app-notes',
  imports: [RouterModule, NgFor, NoteCardComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  notes:Note[] = []
  constructor(private noteService:NoteService) {}

  ngOnInit() {
    this.notes = this.noteService.getNotes()
  }

}
