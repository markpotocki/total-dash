import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

// Max age to cache a request.
const MAX_AGE = 30000; // 30 seconds (API is 5 calls per sec limit)
// Max size of the cache
const MAX_CACHE_LENGTH = 50; // 50 calls

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {

  private _cache = new Map<string, RequestEntry>();

  constructor() {
  }

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    console.log('getting from cache');
    const url = request.urlWithParams; // get the current url to compare if we have seen the response
    const cacheValued = this._cache.get(url);
    console.log('cache lookup for url ' + url);

    if (!cacheValued) { // check if the get was null
      console.log('found no value in cache');
      return undefined; // we didn't find it
    }

    // expiration check
    const isExpired = cacheValued.lastRead < (Date.now() - MAX_AGE);
    console.log('cache expiration is ' + isExpired);
    return isExpired ? undefined : cacheValued.response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = request.urlWithParams;
    const entry = new RequestEntry(url, response);
    console.log('request being added to cache with url ' + url);
    this._cache.set(url, entry);

    // cleanup the list
    this._cache.forEach((requestEntry, key) => {
      if (entry.lastRead < Date.now() - MAX_AGE) {
        console.log('cleaning up entry for url ' + key);
        this._cache.delete(key);
      }
    });
  }

}

class RequestEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number = Date.now();

  constructor(url: string, response: HttpResponse<any>) {
    this.url = url;
    this.response = response;
  }
}
