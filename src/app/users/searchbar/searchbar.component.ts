import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, pluck } from 'rxjs';
import { SearchOptions } from '../../enums/search-options';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements AfterViewInit {
  @ViewChild('searchOptionButton') searchOptionButton!: ElementRef;
  @ViewChild('searchOptionsMenu') searchOptionsMenu!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() changeSearchBar = new EventEmitter<string>();
  @Output() changeSearchOption = new EventEmitter<string>()

  searchBase: string = 'name';
  searchOptions = SearchOptions

  ngAfterViewInit(): void {
    const input$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(2000),
        pluck('target', 'value'),
        distinctUntilChanged()
      )
      .subscribe((res: any) => {
        this.changeSearchBar.emit(res);
      });
  }

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
    this.searchBase = this.searchOptionButton.nativeElement.innerHTML;
    this.changeSearchOption.emit(this.searchBase)
  }
}
