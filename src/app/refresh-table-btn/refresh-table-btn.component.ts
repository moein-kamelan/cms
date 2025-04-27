import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-refresh-table-btn',
  imports: [MaterialModule],
  templateUrl: './refresh-table-btn.component.html',
  styleUrl: './refresh-table-btn.component.css'
})
export class RefreshTableBtnComponent {
@Output() onreloadTable = new EventEmitter()

onClickreloadTable() {
  this.onreloadTable.emit()
}

}
