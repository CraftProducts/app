import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-layout-renderer',
    templateUrl: './layout-renderer.component.html'
})
export class LayoutRendererComponent {
    @Input() layout: any;

    onDragEnd(columnindex: number, e: { gutterNum: number, sizes: Array<number> }) {
 console.log(columnindex, e);
        // if (columnindex === -1) {
        //     this.config.columns.filter(c => c.visible === true).forEach((column, index) => column.size = e.sizes[index]);
        // }
        // else {
        //     this.config.columns[columnindex].rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
        // }
    }
}