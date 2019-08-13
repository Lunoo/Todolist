import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

const MOBILE_WIDTH = 576;

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    isMobile$: Observable<boolean> = this.createIsMobile$();

    private createIsMobile$(): Observable<boolean> {
        return fromEvent(window, 'resize').pipe(
            debounceTime(200),
            map(() => window.innerWidth < MOBILE_WIDTH),
            startWith(window.innerWidth < MOBILE_WIDTH),
            distinctUntilChanged()
        );
    }
}
