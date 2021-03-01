import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsComponent} from './settings.component';
import {SettingsService} from '../services/settings/settings.service';
import {FormsModule} from '@angular/forms';
import {THEMES} from './types/AppSettings';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatOptionHarness} from '@angular/material/core/testing';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        FormsModule
      ],
      providers: [SettingsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of themes', async () => {
    const formThemeOptions = await loader.getAllHarnesses(MatOptionHarness);

    for (const option of formThemeOptions) {
      expect(await option.getText()).toBeDefined();
      expect(THEMES).toContain(await option.getText());
    }
  });


});
