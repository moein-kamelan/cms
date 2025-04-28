import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  output,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageCountPipe } from '../../pipes/page-count.pipe';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { MaterialModule } from '../../material.module';
@Component({
  selector: 'app-pagination',
  imports: [PageCountPipe, CommonModule, MaterialModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent  {
  @ViewChild('pagePerPageInput') pagePerPageInput!: ElementRef;
  @Input() currentPage : number = 1
  @Input() pageCount : number = 1
  @Input() paginationInfos : any
  @Output() newPaginationInfos  = new EventEmitter()

  constructor(private usersService: UsersService) {}

 



  onGoPrevPage(currentPageIndex : number) {
  if(currentPageIndex > 1) {

    this.newPaginationInfos.emit({...this.paginationInfos , pageNumber : currentPageIndex - 1})
  }

  }
  onGoNextPage(currentPageIndex : number) {
  if(currentPageIndex < this.pageCount) {

    this.newPaginationInfos.emit({...this.paginationInfos , pageNumber : currentPageIndex + 1})
  }

  }

  onchangePageIndex(pageIndex: number) {
    this.newPaginationInfos.emit({...this.paginationInfos , pageNumber : pageIndex })


  }

  onChangePageSize(newPageSize: number) {
  this.newPaginationInfos.emit({...this.paginationInfos , pageSize : newPageSize})
  
  }
}
