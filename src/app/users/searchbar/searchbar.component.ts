import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  @ViewChild('searchOptionButton') searchOptionButton!: ElementRef;
  @ViewChild('searchOptionsMenu') searchOptionsMenu!: ElementRef;
  
  searchBase : string = "all"
  toggleSearchOptions(el: HTMLDivElement) {
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
      el.classList.add('block');
    } else {
      el.classList.add('hidden');
      el.classList.remove('block');
    }
  }

  sortSearch(el: HTMLButtonElement) {
    this.searchOptionButton.nativeElement.innerHTML = el.innerHTML;
    this.toggleSearchOptions(this.searchOptionsMenu.nativeElement);
    this.searchBase = this.searchOptionButton.nativeElement.innerHTML
    console.log('this.searchBase:', this.searchBase)

  }



  
  
}
