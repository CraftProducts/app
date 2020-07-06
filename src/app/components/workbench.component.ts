import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../+state/app.state';
import { ActivatedRoute, Router, UrlSerializer, PRIMARY_OUTLET } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LoadTemplateAction } from '../+state/app.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html'
})
export class WorkbenchComponent implements OnInit, OnDestroy {

  constructor(public store$: Store<AppState>, public router: Router) {
  }
  ngOnInit(): void {
    const segments = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments;

    (segments.length >= 2)
      ? this.store$.dispatch(new LoadTemplateAction({ groupCode: segments[1].path, templateCode: segments[2].path }))
      : this.router.navigate(['']);
  }
  
  ngOnDestroy(): void {
  }
}
