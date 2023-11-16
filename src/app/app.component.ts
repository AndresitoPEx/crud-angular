import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  readonly APIUrl = "http://localhost:5288/api/todoapp/";
  notes: any = [];
  newNotes: string = ''; // nueva nota

  constructor(private http: HttpClient) {}

  refreshNotes() {
    this.http.get(this.APIUrl + 'GetNotes').subscribe(
      (data) => {
        this.notes = data;
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }

  ngOnInit() {
    this.refreshNotes();
  }

  addNotes() {
    const formData = new FormData();
    formData.append("newNotes", this.newNotes);

    this.http.post(this.APIUrl + 'AddNotes', formData).subscribe(
      (data) => {
        alert(data);
        this.refreshNotes();
      },
      (error) => {
        console.error('Error adding notes:', error);
      }
    );
  }

  deleteNotes(id: any) {
    this.http.delete(this.APIUrl + 'DeleteNotes?id=' + id).subscribe(
      (data) => {
        alert(data);
        this.refreshNotes();
      },
      (error) => {
        console.error('Error deleting notes:', error);
      }
    );
  }
}
