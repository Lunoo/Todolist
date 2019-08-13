import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { LogService } from './log.service';

class MatSnackBarMock {
    open(): void {}
}

describe('LogService', () => {
    let logService: LogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatSnackBar, useClass: MatSnackBarMock}
            ]
        });

        logService = TestBed.get(LogService);
    });

    it('showMessage method should call snackBar.open', () => {
        spyOn(logService['snackBar'], 'open');

        logService.showMessage('Message', 'success');

        expect(logService['snackBar'].open).toHaveBeenCalled();
    });
});
