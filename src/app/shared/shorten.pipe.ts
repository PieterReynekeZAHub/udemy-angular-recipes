import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }

}
