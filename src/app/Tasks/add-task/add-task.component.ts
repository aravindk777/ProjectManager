import { Component, OnInit, Optional, Inject } from '@angular/core';
import { TasksService } from 'src/services/tasks.service';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { Task } from 'src/Model/Tasks/task.model';
import { User } from 'src/Model/Users/user.Model';
import { Projects } from 'src/Model/Projects/projects.model';
import { UserService } from 'src/services/user.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  newTask: Task;
  parents: ViewTasks[];
  activeUsers: User[];
  workInProgress = false;
  projects: Projects[];

  constructor(
    private taskServices: TasksService,
    private userServices: UserService,
    private projectServices: ProjectService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private matSbStatus: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public taskToEdit?: Task
    ) {
      // console.log('Incoming data: ' + JSON.stringify(this.taskToEdit));
      if (taskToEdit === null || taskToEdit === undefined) {
        // console.log('Initialize for new task...');
        this.newTask = new Task();
      } else { this.newTask = taskToEdit; }
      // console.log('Task to work: ' + JSON.stringify(this.newTask));
  }

  ngOnInit() {
    this.GetActiveUsersList();
    this.GetProjectInfo();
    this.GetParentTasks(this.newTask !== null ? this.newTask.TaskId : 0);
  }

  GetParentTasks(_id: number): void {
    this.taskServices.GetParents()
    .subscribe(tasks => {
      this.parents = tasks.filter(t => {
        return (+(t.TaskId) !== +(_id));
        });
    });
  }

  GetProjectInfo() {
    this.projectServices.GetAll()
    .subscribe(proj => this.projects = proj);
  }

  Save(): void {
    this.workInProgress = true;
    // console.log('Task to Save: ' + JSON.stringify(this.newTask) + ' and TAskid status : ',this.newTask.TaskId !== 0);
    if (this.newTask.TaskId === undefined || this.newTask.TaskId === 0) {
      this.taskServices.AddNewTask(this.newTask)
    .subscribe(status => {
       if (status.TaskId !== 0) {
         // console.log('Saved successfully');
         this.workInProgress = false;
         this.dialogRef.close(status);
      } else {
        // console.log('Not true - whats the status? ' + status);
      }
    },
    error => {
      console.log('Error: ' + JSON.stringify(<any>error));
      this.workInProgress = false;
    }
    );
    } else {
      this.taskServices.UpdateTask(this.newTask.TaskId, this.newTask)
      .subscribe(result => {
        if (result) {
          this.workInProgress = false;
          this.dialogRef.close(status);
        }
      },
      error => {
        // console.log('Add Error: ' + JSON.stringify(<any>error));
        this.workInProgress = false;
      });
  }
  }

  GetActiveUsersList(): void {
    this.userServices.GetActiveUsers()
    .subscribe(data => {
      this.activeUsers = data;
    });
  }

  cancelDialog() {
    this.dialogRef.close(false);
  }
}
