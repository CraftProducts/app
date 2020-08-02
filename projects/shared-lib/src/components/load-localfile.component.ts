import { Component, Output, EventEmitter, Input } from '@angular/core';

export enum UploadFileTypes {
    TEXT = 'TEXT',
    BINARY = 'BINARY',
    DATAURL = 'DATAURL',
    ARRAYBUFFER = 'ARRAYBUFFER'
}
@Component({
    selector: 'sharedlib-load-localfile',
    templateUrl: './load-localfile.component.html'
})
export class LoadLocalFileComponent {
    @Output() fileLoaded = new EventEmitter<any>();
    @Output() error = new EventEmitter<any>();

    @Input() errorMessage: string;
    @Input() label: string;
    @Input() icon: string;
    @Input() accept: string;
    @Input() readAs: string;  //text / binary 
    @Input() cssClass = "btn-primary";

    handleFileInput(args) {
        const files: FileList = args.target.files;
        const nativeElement: any = event.srcElement;
        const file = files && files.length === 1 ? files[0] : null;        
        if (file) {
            this.getConfigurations(file)
                .then(
                    (content) => {
                        nativeElement.value = "";
                        (content) ? this.fileLoaded.emit({ filename: file.name, content }) : null;
                    },
                    (err) => this.error.emit(err)
                )
        }
    }
    async getConfigurations(file: File) {
        return new Promise<any>((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                try {
                    resolve(event.target.result)
                } catch (ex) {
                    reject(this.errorMessage)
                }
            };

            this.readAs = this.readAs || UploadFileTypes.TEXT;

            switch (this.readAs.toUpperCase()) {
                case UploadFileTypes.BINARY:
                    reader.readAsBinaryString(file);
                    break;
                case UploadFileTypes.DATAURL:
                    reader.readAsDataURL(file);
                    break;
                case UploadFileTypes.ARRAYBUFFER:
                    reader.readAsArrayBuffer(file);
                    break;
                default:
                    reader.readAsText(file);
                    break;
            }
        });
    }
}
