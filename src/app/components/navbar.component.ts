import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { UserModelCommandTypes, UserModelCommandAction } from '../appcommon/lib/CommonActions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    constructor(public store$: Store<AppState>) {
    }
    ngOnInit(): void {
        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
    }

    onSave() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Save }));
    }
    onReset() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset }));
    }

    handleFileInput(files: FileList) {
        const file = files && files.length === 1 ? files[0] : null;
        if (file) {
            this.getConfigurations(file)
                .then((data) => {
                    if (data) {
                        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Open, data }));
                    }
                }, (err) => {
                    // this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true });
                    // configUploader.clear();
                })
        }
    }
    async getConfigurations(file: File) {
        return new Promise<any>((resolve, reject) => {
            var reader = new FileReader();

            reader.onload = (event: any) => {
                var data = event.target.result;
                try {
                    resolve(JSON.parse(data))
                } catch (ex) {
                    reject("Invalid file")
                }
            };
            reader.readAsText(file);
        });
    }
}
