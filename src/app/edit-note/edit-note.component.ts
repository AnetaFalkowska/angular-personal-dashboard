import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-edit-note',
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent implements OnInit {
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');
      if (idParam) {
        this.note = this.noteService.getNote(idParam);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return
    if (this.note) {
      this.noteService.updateNote(this.note.id, form.value);
      this.router.navigateByUrl('/notes');
    }
  }

  deleteNote() {

    if (this.note) {
      this.noteService.deleteNote(this.note.id);
      this.router.navigateByUrl('/notes');
    }
  }
}
