import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OnlineService {
    isOnline$: Observable<boolean> = this.createIsOnline$();

    private createIsOnline$(): Observable<boolean> {
        return merge<boolean>(
            fromEvent(window, 'offline').pipe(map(() => false)),
            fromEvent(window, 'online').pipe(map(() => true)),
            of(navigator.onLine)
        );
    }
}
