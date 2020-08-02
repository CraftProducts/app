import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoadCustomTemplateAction } from '../+state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  loadedFile$: Subscription;

  constructor(public store$: Store<AppState>, public router: Router) {
  }

  ngOnInit(): void {
    this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
      .pipe(filter(file => file && file.content))
      .subscribe(file => {
        if (file.type === 'template') {
          this.store$.dispatch(new LoadCustomTemplateAction(file.content));
          this.router.navigate(['modeler/custom', file.content.code], { queryParams: { mode: 'custom' } })
        } else {
          this.router.navigate(['modeler', file.content.groupCode, file.content.templateCode], { queryParams: { mode: 'file' } })
        }
      });
  }

  ngOnDestroy(): void {
    this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
  }
}
