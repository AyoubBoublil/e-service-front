import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user";
import {AlertService, UserService} from "../shared/services";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  users: User[] = [];
  isShowErrorMsg: boolean = false;

  constructor(private userService: UserService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      console.log('All users ', users);
      this.users = users
    },error => {
      console.log('error ', error.error);
      // this.alertService.error(error.error.message);
      this.isShowErrorMsg = true;
    });
  }

  getRolesString(roles: any[]) {
    return roles.map(r => r.name).join(', ')
  }

  editUser(user: User) {
    console.log('edit user ', user);
  }

  deleteUser(userToDelete: User) {
    this.userService.deleteUser(userToDelete.id).subscribe(users => {
      console.log('Deleted user ok response ');
      this.users = this.users.filter(user => user.id != userToDelete.id);
    },error => {
      console.log('error ', error.error);
      // this.alertService.error(error.error.message);
      // this.isShowErrorMsg = true;
    });
  }

  isAdmin(roles: any[]) {
    return roles.map(r => r.name).includes("ROLE_ADMIN");
  }

  isTeacherOrStudent(roles: any[]) {
    return roles.map(r => r.name).includes("ROLE_TEACHER") || roles.map(r => r.name).includes("ROLE_STUDENT");
  }

}
