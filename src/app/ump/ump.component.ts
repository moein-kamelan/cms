import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ump',
  imports: [MaterialModule, HeaderComponent , RouterOutlet],
  templateUrl: './ump.component.html',
  styleUrl: './ump.component.css'
})
export class UmpComponent implements OnInit{
  mainUser : any
  constructor( private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    const resolveData = this.route.snapshot.data["userData"]

    if(resolveData) {
      this.mainUser = resolveData.data
    }
  }
}
