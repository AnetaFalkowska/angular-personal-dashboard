import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm }from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  imports: [NgIf, FormsModule, RouterModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  showValidationErrors: boolean = false;

  constructor(private todoService: TodoService, private router:Router, private notificationService:NotificationService) {}

  onFormSubmit(form: NgForm) {
    if (form.invalid) {this.showValidationErrors = true; return}
    const todo = new Todo(form.value.text)
    this.todoService.addTodo(todo);
    this.router.navigateByUrl("/todos")
    this.notificationService.show("Created Todo!")
  }
}
