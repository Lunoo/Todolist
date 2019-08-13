import { fakeAsync, tick } from '@angular/core/testing';

import { DeviceService } from './device.service';

describe('DeviceService', () => {
    it('isMobile$ should work', fakeAsync(() => {
        let resizeTriggered: number = 0;
        new DeviceService().isMobile$.subscribe(() => resizeTriggered++);

        // isMobile$ should be triggered at least once
        expect(resizeTriggered).toBe(1);

        window.dispatchEvent(new Event('resize'));
        tick(200);

        // isMobile$ should not be triggered if window width doesn't changed
        expect(resizeTriggered).toBe(1);
    }));
});
