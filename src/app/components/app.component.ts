import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProductPurpose';
  loadedFile$: Subscription;

  constructor(public store$: Store<AppState>, public router: Router) {
  }

  ngOnInit(): void {
    this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
      .pipe(filter(file => file && file.content))
      .subscribe(file => this.router.navigate(['modeler', file.content.groupCode, file.content.templateCode], { queryParams: { mode: 'file' } }));
  }

  ngOnDestroy(): void {
    this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
  }
}
