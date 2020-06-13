import { NgModule } from '@angular/core';
import { PendingChangesGuard } from './pending-changes.guard';
import { AutofocusDirective } from './autofocus.directive';
import { StripMarkdownPipe } from './stripmd-pipe';

@NgModule({
  declarations: [AutofocusDirective, StripMarkdownPipe],
  exports: [AutofocusDirective, StripMarkdownPipe],
  imports: [
  ],
  providers: [
    PendingChangesGuard
  ]

})
export class SharedLibModule { }
