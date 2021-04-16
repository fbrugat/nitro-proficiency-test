import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

    form: FormGroup;
    title = 'Edit';

    constructor(
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private dialogRef: MatDialogRef<PostEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {

        this.form = this.fb.group({
            author: [data.author, Validators.required],
            date: [this.datePipe.transform(data.date, 'dd/MM/yyyy'), Validators.required],
            location: [data.location, Validators.required],
            text: [data.text, Validators.required]
        });

        // Disable the non-editable inputs
        this.form.controls.date.disable();
        this.form.controls.text.disable();

    }

    ngOnInit() {}

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
