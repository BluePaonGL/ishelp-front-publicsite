import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateEventComponent, eventData } from "./create-event.component";

@Component({
  selector: 'app-back',
  templateUrl: 'event-dialog.component.html',
  styleUrls: ['../event.component.scss']
})
export class EventDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: eventData,private dialogRef: MatDialogRef<CreateEventComponent>,) {}
}
