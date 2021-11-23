import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestService {
    private url = 'http://192.168.2.85'
    constructor(private http: HttpClient) { }

    
    // Authenticate
    authRequests(login: string, password: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.post( this.url + "/api/auth/login", {"login": login, "password": password}, {headers: header})
    }

    regRequest(name: string, last_name: string, middle_name: string, login: string, company_name: string, division: string, birth_city: string, inn: number, email: string, phone: number, password: string) {
        return this.http.post(this.url + '/api/auth/register',  {"name": name, "last_name": last_name, "middle_name": middle_name, "login": login, "company_name": company_name, "division": division, "birth_city": birth_city, "inn": inn, "phone": phone, "email": email, "password": password})
    }
    // End of Authenticate


    // Announcement
    getAnnounceData() {
        return this.http.get("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=100" + '/todos' )
    }
    // End of Announcement

    
    // Profile
    getProfileRequest() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/profile/' + localStorage.getItem('user'), {headers:header})
    }
    // End of Profile
}