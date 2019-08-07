import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

const MOBILE_WIDTH = 576;

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    isMobile$: Observable<boolean> = this.createIsMobile$();

    private createIsMobile$(): Observable<boolean> {
        return merge<boolean>(
            fromEvent(window, 'resize').pipe(map(() => window.innerWidth < MOBILE_WIDTH)),
            of(window.innerWidth < MOBILE_WIDTH)
        ).pipe(distinctUntilChanged());
    }
}
