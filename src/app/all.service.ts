import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestService {
    private url = 'http://investcom.nets.tj'
    constructor(private http: HttpClient) { }

    authRequests(login: string, password: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.http.post( this.url + "/auth/login.php", {"login": login, "pass": password}, {headers: header})
    }

    getAnnounceData() {
        return this.http.get(this.url + '/todos' )
    }
}