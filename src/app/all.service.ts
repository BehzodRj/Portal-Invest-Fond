import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestService {
    private url = 'https://jsonplaceholder.typicode.com/todos'
    constructor(private http: HttpClient) { }

    getAnnounceData() {
        return this.http.get(this.url )
    }
    
}