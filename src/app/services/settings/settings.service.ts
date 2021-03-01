import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppSettings} from '../../settings/types/AppSettings';

const STORAGE_KEY = 'settings-total-dash';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // settings config object
  private appSettings: BehaviorSubject<AppSettings>;

  // this class will hold all our config data (we'll load from environment) and allow app editing

  constructor() {
    const storageLoadedSettings = localStorage.getItem(STORAGE_KEY);
    if (storageLoadedSettings === null) {
      // does not exists, create new settings
      this.appSettings = new BehaviorSubject<AppSettings>(new AppSettings());
    } else {
      // load the stored settings
      this.appSettings = new BehaviorSubject<AppSettings>(this.decodeSettings(storageLoadedSettings));
    }
  }

  get settings(): AppSettings {
    return this.appSettings.getValue();
  }

  set settings(appSettings: AppSettings) {
    // save to storage
    const settingsString = this.encodeSettings(appSettings);
    localStorage.setItem(STORAGE_KEY, settingsString);
    // push to subject
    this.appSettings.next(appSettings);
  }

  get stockDataAPIKey$(): Observable<string> {
    return this.appSettings.pipe(
      map((settings: AppSettings) => settings.apiKey)
    );
  }

  getSettings$(): Observable<AppSettings> {
    return this.appSettings.asObservable();
  }

  private encodeSettings(settings: AppSettings): string {
    // json encode to string
    const jsonString = JSON.stringify(settings);
    // base 64 encode
    const base64String = btoa(jsonString);
    // return
    return base64String;
  }

  private decodeSettings(settings: string): AppSettings {
    // base 64 decode to json string
    const jsonString = atob(settings);
    // json parse to object
    const appSettings = JSON.parse(jsonString);
    // return
    return appSettings;
  }
}
