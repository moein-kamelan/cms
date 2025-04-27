import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  tap,
} from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  imports : [ReactiveFormsModule]
})
export class SearchbarComponent implements AfterViewInit, OnDestroy, OnInit {
  @Output() searchChanged = new EventEmitter<any>();
  @Input() paginationInfos: any;
  @ViewChild("searchbarForm") searchbarForm! : ElementRef;
  @ViewChild('firstNameSearchInput') firstNameSearchInput! : ElementRef;
  @ViewChild('lastNameSearchInput') lastNameSearchInput!: ElementRef;
  @ViewChild('userNameSearchInput') userNameSearchInput!: ElementRef;
  @ViewChild('organizationNameSearchInput')
  organizationNameSearchInput!: ElementRef;
  resetTableSubscription! : Subscription

  isLoading: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    userName: false,
    organizationName: false,
  };

  private subscriptions: Subscription[] = [];
  private searchValues: { [key: string]: string } = {};

  searchbarFormGroup!: FormGroup;

  constructor( private userService : UsersService) {

  }
  

  ngOnInit(): void {
    this.searchbarFormGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      organizationName: new FormControl(''),
    });

    this.resetTableSubscription = this.userService.$resetTableSub.subscribe((res : boolean) => {
      if(res) {
        this.ResetForm()
        
      }
    })
    
  }

  ngAfterViewInit(): void {
    this.setupSearch(this.firstNameSearchInput, 'firstName');
    this.setupSearch(this.lastNameSearchInput, 'lastName');
    this.setupSearch(this.userNameSearchInput, 'userName');
    this.setupSearch(this.organizationNameSearchInput, 'organizationName');
  }

  private setupSearch(inputRef: ElementRef, field: string) {
    const sub = fromEvent(inputRef.nativeElement, 'input') 
      .pipe(
        tap(() => (this.isLoading[field] = true)), 
        map((event: any) => event.target.value.trim()),
        debounceTime(2000),
        tap(() => (this.isLoading[field] = false)), 
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (value) {
          this.searchValues[field] = value;
        } else {
          delete this.searchValues[field];
        }
        this.emitSearch();
      });

    this.subscriptions.push(sub);
  }

  private emitSearch() {
    const baseRequest = { ...this.paginationInfos };

    const fields = Object.keys(this.searchValues).map((key) => ({
      field: key,
      operator: 7,
      value: this.searchValues[key],
    }));

    if (fields.length > 0) {
      (baseRequest as any).comparisonObjects = [
        {
          logicalComparisonOperator: 0,
          comparisonObjects: fields,
        },
      ];
    } else {
      delete baseRequest?.comparisonObjects;
    }

    this.searchChanged.emit({ ...baseRequest, pageNumber: 1 });
  }

  ResetForm() {
    this.searchbarFormGroup.reset();
    this.searchValues = {};           
    this.emitSearch();  
  }

  

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.resetTableSubscription.unsubscribe()
  }
}
