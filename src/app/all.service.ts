import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestService {
    private url = 'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=20'
    constructor(private http: HttpClient) { }

    getAnnounceData() {
        return this.http.get(this.url )
    }
    
}