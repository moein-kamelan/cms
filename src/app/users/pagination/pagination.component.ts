import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, output, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PageCountPipe } from '../../pipes/page-count.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pagination',
  imports: [PageCountPipe , CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent  implements OnChanges , OnInit , AfterViewInit{
@Input() pageCount: number = 1
@Input() CurrentPage : number = 1
@Output() incrementPageCount = new EventEmitter<number>()
@Output() decrementPageCount = new EventEmitter<number>()
@Output() changePageCount = new EventEmitter<number>()
@Output() changePagePerPage = new EventEmitter<number>()
@ViewChild("pagePerPageInput") pagePerPageInput! : ElementRef

ngOnChanges(changes: SimpleChanges): void {
    console.log("this.CurrentPage =>" , this.CurrentPage)
    
}

ngOnInit(): void {


}

ngAfterViewInit(): void {
  console.log('this.pagePerPageInput.nativeElement.value:', this.pagePerPageInput.nativeElement.value)
    
}



onClickNext() {
  if(this.CurrentPage < this.pageCount){

    ++this.CurrentPage
    this.incrementPageCount.emit(this.CurrentPage)
  }
  console.log('this.CurrentPage:', this.CurrentPage)
}
onClickPrev() {
  if(this.CurrentPage !== 1) {

    --this.CurrentPage
    this.decrementPageCount.emit(this.CurrentPage)
  }
  console.log('this.CurrentPage:', this.CurrentPage)
}
onchangePage(pageIndex : number) {
this.CurrentPage = pageIndex
this.changePageCount.emit(this.CurrentPage)
console.log('this.CurrentPage:', this.CurrentPage)


}

changeItemPerPage(el : HTMLInputElement) {
  const itemPerPageValue = +el.value
  this.onchangePage(1)
  this.changePagePerPage.emit(itemPerPageValue)
}



}
