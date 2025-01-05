import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { ActivatedRoute, ParamMap, Router, RouterModule} from '@angular/router';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo',
  imports: [NgIf, FormsModule, RouterModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent implements OnInit {

  todo?:Todo
   
  constructor(private route:ActivatedRoute, private todoService: TodoService, private router:Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      const todoId = paramMap.get('id')
      if (todoId) this.todo = this.todoService.getTodo(todoId)
    })

  }

  onFormSubmit(form:NgForm) {
    if (form.invalid) return
    if (this.todo) 
    this.todoService.updateTodo(this.todo.id, form.value)
    this.router.navigateByUrl("/todos")

}
}
