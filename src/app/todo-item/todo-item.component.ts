import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Input() todo!:Todo

  @Output() editClick: EventEmitter<void> = new EventEmitter()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter()

onEditClick() {
  this.editClick.emit()

}

onDeleteClick() {
  this.deleteClick.emit()

}

}
