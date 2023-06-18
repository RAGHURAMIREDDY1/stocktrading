import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/register', this.user).subscribe(
      (response) => {
        console.log(response);
        // Handle success response here
      },
      (error) => {
        console.log(error);
        // Handle error response here
      }
    );
  }
}
