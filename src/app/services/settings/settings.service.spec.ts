import {TestBed} from '@angular/core/testing';

import {SettingsService} from './settings.service';
import {AppSettings} from '../../settings/types/AppSettings';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create local storage entry', () => {
    // check for key 'settings-total-dash' after constructor
    const KEY = 'settings-total-dash';
    const localStorageSettings = localStorage.getItem(KEY);
    expect(localStorageSettings).toBeDefined();
  });

  it('should have non null settings', (done) => {
    const config$ = service.getSettings$();
    config$.subscribe(
      config => {
        expect(config).toBeDefined();
        expect(config).toBeInstanceOf(AppSettings);
        done();
      }
    );
  });
});
