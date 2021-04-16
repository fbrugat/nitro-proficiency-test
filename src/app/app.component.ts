import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { Post } from './models/post.model';
import * as moment from 'moment';
import SampleJson from '../assets/data/posts.json';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {}

  public groupByOption = 'week';          // This is the group by option by default ("Posted Week")
  public refactoredPosts: any;            // This will be used to store the post after the refactor
  public posts: Array<Post> = SampleJson; // Import the .josn Post files from the /assets/data

  ngOnInit() {

    // By default, group by the post array by "Posted Week"
    this.groupByPosts(this.groupByOption);
  }

  // Execute the "groupByPost" function each time the user changes the Group By view
  onValChange(value) {

    this.groupByOption = value;
    this.groupByPosts(value);
  }

  // This function opens a dialog to create a new post
  create() {

    const dialogRef = this.dialog.open(PostCreateComponent, {
      width : '450px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {

        /*
          Once the information gets back from the dialog, the system generates a unique ID
          saves the current date in a milisecond format and updates the main Posts array with this new object.
        */
        data.id = this.generateId();
        data.date = Date.now().toString();
        this.posts.push(data);

        // After added the new object, the "group by" array need to be rebuild - depending of the current selected option
        this.groupByPosts(this.groupByOption);

      }
    });
  }

  // This function opens a dialog to update a post
  edit(post) {

    // Opens a dialog passing the post data
    const dialogRef = this.dialog.open(PostEditComponent, {
      width : '450px',
      data  : post
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {

        // Search by ID from the list of posts
        const index = this.posts.findIndex(e => e.id === post.id);

        // If the post exist, then update it with the new values
        if (index !== -1) {
          this.posts[index].author = data.author;
          this.posts[index].location = data.location;
        }

        // The "group by" array needs to be rebuild
        this.groupByPosts(this.groupByOption);
      }
    });
  }

  // This function returns the next available ID for a new post
  generateId(): number {

    // Deep copy of the current posts
    const postsCopy  = JSON.parse(JSON.stringify(this.posts));

    // Order by date - descending
    const ordered = postsCopy.sort((a, b) => b.date.localeCompare(a.date));

    // Returns the highest ID of the current Posts + 1
    return ordered[0].id + 1;
  }

  /*
    This functions from an array generates an object grouped by a key. He returns an object with diferent
    keys - each one with one unique value of the the array (like "week", "location" or "author"), and for
    each new key and array of the original items meeting this criteria.
  */
  groupBy(array, key): any {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  }

  // This functions is used to build the copy of the current post wich have the correct structure to show at the view
  groupByPosts(group) {

    /*
      Only in case that we need to group by "Posted Week" we'll need to refactor a bit the original posts.
      In order to be able to sort by an existing key like 'location' or 'author' the original post needs to be
      updated finding the current week of the post date.
      For this test I consider that the week starts on Sundays and finish on Saturdays. The object is updated with
      a new key called "week" that is an string with the following format "From DD/MM/YYYY to DD/MM/YYYY".
    */
    if (group === 'week') {

      // Refactored the posts adding the First day and Last day of the week
      this.posts.forEach(e => {
        const date = moment(e.date, 'x');
        const first = date.clone().startOf('week');
        const last = date.clone().endOf('week');

        e.week = 'From ' + first.format('DD/MM/YYYY') + ' to ' + last.format('DD/MM/YYYY');
      });

    }

    // Generate the grouped by new post object
    this.refactoredPosts = this.groupBy(this.posts, group);
  }
}
