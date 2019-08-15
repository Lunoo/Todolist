import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { MatSnackBarMock } from '../../shared';
import { LogService } from './log.service';

describe('LogService', () => {
    let logService: LogService;
    let snackBar: MatSnackBar;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatSnackBar, useValue: MatSnackBarMock}
            ]
        });

        logService = TestBed.get(LogService);
        snackBar = TestBed.get(MatSnackBar);
    });

    it('showMessage method should call snackBar.open', () => {
        spyOn(snackBar, 'open');

        logService.showMessage('Message', 'success');

        expect(snackBar.open).toHaveBeenCalled();
    });
});
