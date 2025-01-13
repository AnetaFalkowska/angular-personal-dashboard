import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';
import { NgIf } from '@angular/common';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {

  showValidationErrors:boolean = false

constructor(private noteService:NoteService, private router:Router, private notificationService: NotificationService) {

}

  onFormSubmit(form:NgForm) {   

    if (form.invalid) {this.showValidationErrors = true; return}

    const note = new Note(form.value.title, form.value.content)
    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
    this.notificationService.show("Created Note!")
  }
}
