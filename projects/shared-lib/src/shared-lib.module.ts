import { NgModule } from '@angular/core';
import { AutofocusDirective } from './lib/autofocus.directive';
import { StripMarkdownPipe } from './lib/stripmd-pipe';
import { PendingChangesGuard } from './lib/pending-changes.guard';
import { LoadLocalFileComponent } from './components/load-localfile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

const list = [AutofocusDirective, StripMarkdownPipe, LoadLocalFileComponent];
@NgModule({
    declarations: list,
    exports: list,
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    providers: [PendingChangesGuard]

})
export class SharedLibModule { }
