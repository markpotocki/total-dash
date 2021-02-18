import {Injectable, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnDestroy {

  private mobileQuery: MediaQueryList;

  constructor(private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  get isMobile$(): Observable<boolean> {
    return of(this.mobileQuery.matches);
  }

  ngOnDestroy(): void {
  }

}
