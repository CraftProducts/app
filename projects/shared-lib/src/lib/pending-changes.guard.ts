import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const UNLOAD_WARNING_MESSAGE = 'WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
  unloadNotification: ($event: any) => void;
}

@Injectable({ providedIn: 'root' })
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    return !component || component.canDeactivate()
      ? true
      : confirm(UNLOAD_WARNING_MESSAGE);
  }
}
