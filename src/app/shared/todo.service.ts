import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [ new Todo("Lorem ipsum"), new Todo("Lorem ipsum 2")]

  constructor() {

  }

  getTodos() {
    return this.todos;
  }
  getTodo(id: string) {
    return this.todos.find((t) => t.id === id);
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(id: string, updatedFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedFields);
    }
  }
  deleteTodo(id: string) {
    const todoIndex = this.todos?.findIndex((t) => t.id === id);
    if (todoIndex === -1) return;

    this.todos.splice(todoIndex, 1);
  }
}
