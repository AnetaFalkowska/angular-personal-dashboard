import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, NgFor, RouterModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [animate(200, style({ opacity: 0, height:0}))])
    ])
  ]
})
export class TodosComponent implements OnInit {

  todos?: Todo[]

  constructor(private todoService:TodoService, private router:Router, private notificationService:NotificationService) {}

ngOnInit(): void {
  this.todos = this.todoService.getTodos()
}

toggleCompleted(todo:Todo) {
this.todoService.updateTodo(todo.id, {completed: !todo.completed})
}

onEditClick(todo:Todo) {
  this.router.navigate(['/todos', todo.id])
}

onDeleteClick(todo:Todo) {
this.todoService.deleteTodo(todo.id)
this.notificationService.show("Deleted Todo!")
}

}
