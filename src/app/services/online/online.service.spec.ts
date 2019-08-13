import { OnlineService } from './online.service';

describe('OnlineService', () => {
    it('isOnline$ should work', () => {
        let isOnlineTriggered: number = 0;
        new OnlineService().isOnline$.subscribe(() => isOnlineTriggered++);

        // isOnline$ should be triggered at least once
        expect(isOnlineTriggered).toBe(1);

        // isOnline$ should be triggered from window.online event
        window.dispatchEvent(new Event('online'));
        expect(isOnlineTriggered).toBe(2);

        // isOnline$ should be triggered from window.offline event
        window.dispatchEvent(new Event('offline'));
        expect(isOnlineTriggered).toBe(3);
    });
});
