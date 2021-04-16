import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    form: FormGroup;
    title = 'Create';

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<PostCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {

        this.form = this.fb.group({
            author: ['', Validators.required],
            location: ['', Validators.required],
            text: ['', Validators.required]
        });

    }

    ngOnInit() {}

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
