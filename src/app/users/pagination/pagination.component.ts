import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, output, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PageCountPipe } from '../../pipes/page-count.pipe';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-pagination',
  imports: [PageCountPipe , CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent  implements OnChanges , OnInit , AfterViewInit{

@ViewChild("pagePerPageInput") pagePerPageInput! : ElementRef
@Input() totalUsersCount! : number
pageCount : number = 1
currentPage : number = 1
paginationInfos  = {
  "pageNumber": 1,
  "pageSize": 5
}

constructor(private usersService : UsersService) {

}

ngOnChanges(changes: SimpleChanges): void {

  if (changes['totalUsersCount']) {
    
    this.pageCount = Math.ceil(this.totalUsersCount / this.paginationInfos.pageSize);
    
    
  }

  
  
    
}

ngOnInit(): void {
this.paginationInfos = this.usersService.paginationSub.getValue()
this.currentPage = this.paginationInfos.pageNumber
this.usersService.usersSub.subscribe((res) => {
  console.log("res => " , res);
  
})


}

ngAfterViewInit(): void {
    
}


onGoPrevPage() {
  if(this.paginationInfos.pageNumber > 1) {
  const newPage = this.paginationInfos.pageNumber -1
  this.paginationInfos.pageNumber = newPage
  this.currentPage = newPage
  this.usersService.paginationSub.next({...this.paginationInfos })
  }
}
onGoNextPage() {
  if(this.paginationInfos.pageNumber < this.pageCount) {
  const newPage = this.paginationInfos.pageNumber + 1
  this.paginationInfos.pageNumber = newPage
  this.currentPage = newPage
  console.log('this.paginationInfos:', this.paginationInfos)
  this.usersService.paginationSub.next({...this.paginationInfos })
  }
}


onchangePageIndex(pageIndex : number) {
  this.currentPage = pageIndex
  this.paginationInfos.pageNumber = pageIndex
  this.usersService.paginationSub.next({...this.paginationInfos, pageNumber: pageIndex})
}


onChangePageSize( pageSize : HTMLInputElement ) {

  this.pageCount = Math.ceil(this.totalUsersCount / +pageSize.value)
  this.paginationInfos.pageSize = +pageSize.value
   console.log('this.pageCount:', this.pageCount)
   this.currentPage = 1
   this.usersService.paginationSub.next({...this.paginationInfos })

}

}
