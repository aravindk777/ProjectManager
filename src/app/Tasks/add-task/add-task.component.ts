import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/services/tasks.service';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
// import * as jQuery from 'jquery';
import { Task } from 'src/Model/Tasks/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  newTask: Task;
  taskId: number;
  parents: ViewTasks[];
  pageTitle: string;
  saveStatus = 0;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private taskServices: TasksService
    ) {
    this.newTask = new Task();
  }

  /*
  Get the Task details from the service
  */
  GetTaskInfo(_taskId: number): Task {
    if (_taskId !== undefined) {
      // alert('Inside GetTaskInfo for Id: ' + _taskId);
      this.taskServices.GetTask(_taskId)
      .subscribe(result => {
        this.newTask = result;
      });
      return this.newTask;
    }
  }

  ngOnInit() {
    this.route.queryParams
        .subscribe(p => {
          if (p.id !== undefined) {
            this.taskId = p.id;
            // console.log('local variable value: ', this.taskId);
            this.newTask = this.GetTaskInfo(this.taskId);
            console.log('Viewing task - ' + this.taskId);
            this.pageTitle = 'Editing Task (Task Id -' + p.id + ')';
          } else {
            // console.log('No param passed.');
            this.taskId = 0;
            this.pageTitle = 'Add Task';
            this.newTask = new Task();
          }

          // Get parent tasks for drop down
          this.GetParentTasks(this.taskId);

          //jQuery('[name="successMsg"]').hide();
          //jQuery('[name="errorMsg"]').hide();
        });
  }

  GetParentTasks(_id: number): void {
    // console.log('Incoming Id for ignoring in parent tasks list: ' + _id);
    this.taskServices.GetParents()
    .subscribe(tasks => {
      // console.log('Actual parents:' + tasks.length);
      this.parents = tasks.filter(t => {
        // console.log('taskid:' + (+t.TaskId) + '|Id:' + +_id + '|status:' + (+t.TaskId === +_id));
        return (+(t.TaskId) !== +(_id));
        });
      // console.log('Parent tasks: ' + JSON.stringify(this.parents) + ' - length: ' + this.parents.length);
    });
  }

  AddTasks(): void {
    // console.log('Task to add: ' + JSON.stringify(this.newTask));
    if (this.taskId !== 0) {
      console.log('Updating existing task..');
      this.taskServices.UpdateTask(this.taskId, this.newTask)
      .subscribe(result => {
        if (result) {
          // alert('Updated successfully!');
          this.saveStatus = 1;
          // jQuery('[name="successMsg"]').show();
          // jQuery('[name="successMsg"]').html('Task updated successfully. You will be automatically redirected to View page...');
          // jQuery('[name="successMsg"]').fadeIn(100);
          setTimeout(() => {
            this._router.navigate(['/ViewTask']);
          }, 2000);
        }
      });
    } else {
      console.log('Adding new task..');
      this.taskServices.AddNewTask(this.newTask)
    .subscribe(status => {
       if (status) {
         // console.log('Saved successfully');
         // alert('Saved successfully!');
         this.saveStatus = 1;
        //  jQuery('[name="successMsg"]').show();
        //  jQuery('[name="successMsg"]').html('Task Created successfully. You will be automatically redirected to View page...');
        //  jQuery('[name="successMsg"]').fadeIn(100);
          setTimeout(() => {
            this._router.navigate(['/ViewTask']);
          }, 2000);
      } else {
        // console.log('Not true - whats the status? ' + status);
      }
    },
    error => {
      console.log('Error: ' + JSON.stringify(<any>error));
      this.saveStatus = -1;
      // jQuery('[name="successMsg"]').hide();
      // jQuery('[name="errorMsg"]').show();
          setTimeout(() => {
            // jQuery('[name="errorMsg"]').fadeOut();
          }, 3000);
      // window.location.reload();
    }
    );
  }
  }

  ClearOrBack(): void {
    if (this.taskId !== 0) {
      // back button
      this._router.navigate(['/ViewTask']);
    } else {
      this.newTask = new Task();
    }
  }

  successCallback() { this._router.navigate(['/ViewTask']); }
}
