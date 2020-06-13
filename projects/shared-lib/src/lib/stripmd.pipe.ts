import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stripmd' })
export class StripMarkdownPipe implements PipeTransform {
    transform(value: string): string {
        return value ? value.replace(/[\][=~`#|*_-]/g, '') : value;
    }
}
