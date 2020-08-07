import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoadCustomTemplateAction } from '../+state/app.actions';
import { CloseWorkspaceAction } from '../appcommon/lib/CommonActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  eventNavigationEnd$: Subscription;
  loadedFile$: Subscription;

  constructor(public store$: Store<AppState>, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.eventNavigationEnd$ = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const segments = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments;
        if (segments.length > 0 && segments[0].path.toLowerCase() === "templates") {
          this.store$.dispatch(new CloseWorkspaceAction(null));
        }
      })

    this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
      .pipe(filter(file => file && file.content))
      .subscribe(file => {
        if (file.type === 'template') {
          this.store$.dispatch(new LoadCustomTemplateAction(file.content));
          this.router.navigate(['modeler', file.content.code], { queryParams: { mode: 'custom' } })
        } else {
          this.router.navigate(['modeler', file.content.templateCode], { queryParams: { mode: 'file' } })
        }
      });
  }

  ngOnDestroy(): void {
    this.eventNavigationEnd$ ? this.eventNavigationEnd$.unsubscribe() : null;
    this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
  }
}
