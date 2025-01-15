import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];
  storageListenSub:Subscription

  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe(
      (event: StorageEvent) => {
        if (event.key === 'todos') {
          this.loadState();
        }
      }
    );
  }

  ngOnDestroy() {
if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getTodos() {
    return this.todos;
  }
  getTodo(id: string) {
    return this.todos.find((t) => t.id === id);
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updatedFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedFields);
    }
    this.saveState();
  }

  deleteTodo(id: string) {
    const todoIndex = this.todos?.findIndex((t) => t.id === id);
    if (todoIndex === -1) return;

    this.todos.splice(todoIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInLocalStorage = localStorage.getItem('todos');
      const updatedTodos = todosInLocalStorage
        ? JSON.parse(todosInLocalStorage)
        : [];
      this.todos.length = 0;
      this.todos.push(...updatedTodos);
    } catch (err) {
      console.log('There was an error retrieving Todos from local storage');
      console.log(err);
    }
  }
}
