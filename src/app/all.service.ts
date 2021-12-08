import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestService {
    private url = 'http://10.251.2.78:8000'
    constructor(private http: HttpClient) { }

    
    // Authenticate
    authRequests(email: string, password: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.http.post( this.url + "/api/auth/login", {"email": email, "password": password}, {headers: header})
    }

    regRequest(name: string, middle_name: string, last_name: string, email: string, password: string, phone: number, company_name: string, company_country: string, town: string, address_line1: string, address_line2: string, address_line3: string, postal_code: number, inn: number, division: string) {
        return this.http.post(this.url + '/api/auth/register',  {"name": name, "middle_name": middle_name, "last_name": last_name, "email": email, "password": password, "phone": phone, "company_name": company_name, "company_country": company_country, "town": town, "address_line1": address_line1, "address_line2": address_line2, "address_line3": address_line3, "postal_code": postal_code, "inn": inn, "division": division})
    }
    // End of Authenticate


    // Announcement
    // End of Announcement


    // Favourites
    postFavoutitesRequests(anouncements_id: any) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `${localStorage.getItem('access_token')}`
        })
        return this.http.post(this.url + '/favorites', {"anouncements_id": anouncements_id}, {headers:header})
    }
    // End of Favourites
    

    // Profile
    getProfileRequest() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/profile/' + localStorage.getItem('user'), {headers:header})
    }

    // postPhotoProfile(id:any, image: any) {
    //     let header: HttpHeaders = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //     })
    //     return this.http.put(this.url + '/api/auth/profile/update/' + id, {'image': image}, {headers:header})
    // }
    
    changeProfileData(name: string, last_name: string, middle_name: string, division: string, company_name: string, inn: number, email: string, address_line1: string, address_line2: string, address_line3: string, phone: number, company_country: string, town: string, postal_code: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `${localStorage.getItem('access_token')}`
        })
        return this.http.put(this.url + '/api/auth/profile/update/' + localStorage.getItem('user'), {"name": name, "last_name": last_name, "middle_name": middle_name, "division": division, "company_name": company_name, "inn": inn, "email": email, "address_line1": address_line1, "address_line2": address_line2, "address_line3": address_line3, "phone": phone, "company_country": company_country, "town": town, "postal_code": postal_code}, {headers:header})
    }

    getAplProfileReq() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/', {headers: header})
    }
    // End of Profile

    
    // Announcer
    postAnnouncerLots(name: string, project_center_anouncement_id: number, procurement_method: string, type_of_procurement: string, open_date: Date, number_of_lots: number, price: number ) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        
        return this.http.post(this.url + '/api/auth/anouncements/create', { "user_id": localStorage.getItem('user'), "name": name, "project_center_anouncement_id": project_center_anouncement_id, "procurement_method": procurement_method, "type_of_procurement": type_of_procurement, "open_date": open_date, "number_of_lots": number_of_lots, "price": price}, {headers:header})
    }
    getAnnouncerLots() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/allanouncements', {headers:header})
    }
    // End of Announcer
}