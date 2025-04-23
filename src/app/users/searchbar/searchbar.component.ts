import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewChild,

} from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent, pluck, tap } from 'rxjs';
import { SearchOptions } from '../../enums/search-options';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-searchbar',
  imports: [MaterialModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements AfterViewInit , OnDestroy {
  @ViewChild('searchOptionButton') searchOptionButton!: ElementRef;
  @ViewChild('searchOptionsMenu') searchOptionsMenu!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() changeSearchBar = new EventEmitter<string>();
  @Output() changeSearchOption = new EventEmitter<string>()

  searchBase: string = 'name';
  searchOptions = SearchOptions
  isLoading : boolean = false
  input$! : Subscription
  input2$! : Subscription

  ngAfterViewInit(): void {
    this.input$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(2000),
        pluck('target', 'value'),
        tap(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((res: any) => {
        this.changeSearchBar.emit(res);

      });

      this.input2$ = fromEvent(this.searchInput.nativeElement, 'input')
    .subscribe(() => {
      const inputValue = this.searchInput.nativeElement.value;
    if (inputValue.length === 0) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
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

  ngOnDestroy(): void {
    this.input$?.unsubscribe()
    this.input2$?.unsubscribe()
  }
  
  
}
