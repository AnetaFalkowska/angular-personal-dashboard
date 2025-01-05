import { Component, Input } from '@angular/core';
import { Note } from '../shared/note.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-note-card',
  imports: [NgIf],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {

  @Input() note!:Note

}
