import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestService {
    private url = 'http://td.investcom.tj'
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

    refreshToken() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/refresh', {headers: header})
    }
    // End of Authenticate


    // Announcement
    // End of Announcement


    // Profile
    getProfileRequest() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/profile', {headers:header})
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
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.put(this.url + '/api/auth/profile/update', {"name": name, "last_name": last_name, "middle_name": middle_name, "division": division, "company_name": company_name, "inn": inn, "email": email, "address_line1": address_line1, "address_line2": address_line2, "address_line3": address_line3, "phone": phone, "company_country": company_country, "town": town, "postal_code": postal_code}, {headers:header})
    }

    getAplProfileReq() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/', {headers: header})
    }
    // End of Profile

    
    // Announcer
    postAnnouncerLots(name: string, project_center_anouncement_id: number, procurement_method: string, type_of_procurement: string, open_date: Date, number_of_lots: number, price: number, anouncement_private_file: any, anouncement_public_file: any, project_id: number, open_time: any) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Accept': "application/json"
        })
        return this.http.post(this.url + '/api/auth/anouncements/create', { "name": name, "project_center_anouncement_id": project_center_anouncement_id, "procurement_method": procurement_method, "type_of_procurement": type_of_procurement, "open_date": open_date, "number_of_lots": number_of_lots, "price": price, "anouncement_private_file": anouncement_private_file, 'anouncement_public_file': anouncement_public_file, 'project_id': project_id, 'open_time': open_time }, {headers:header})
    }

    putAnnouncerLots(id: number, name: string, project_center_anouncement_id: number, procurement_method: string, type_of_procurement: string, open_date: Date, number_of_lots: number, price: number, anouncement_private_file: any, anouncement_public_file: any, project_id: number, open_time: any) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Accept': "application/json"
        })
        return this.http.put(this.url + '/api/auth/anouncements/update/' + id, { "name": name, "project_center_anouncement_id": project_center_anouncement_id, "procurement_method": procurement_method, "type_of_procurement": type_of_procurement, "open_date": open_date, "number_of_lots": number_of_lots, "price": price, "anouncement_private_file": anouncement_private_file, 'anouncement_public_file': anouncement_public_file, 'project_id': project_id, 'open_time': open_time}, {headers:header})
    }

    getAnnouncerLots() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/allanouncements', {headers:header})
    }

    getAnnouncerProjLots() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/aprojects', {headers:header})
    }

    getAnnouncerLotsById(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/anouncement/'+ id, {headers:header})
    }

    deleteAnnouncerLots(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.delete(this.url + '/api/auth/anouncements/'+ id, {headers:header})
    }

    getAnnouncerForm(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/orders/' + id, {headers:header})
    }

    deleteAnnouncer(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.delete(this.url + '/api/auth/orders/' + id, {headers:header})
    }
    
    // getAnnouncerFormModal(id: number) {
    //     let header: HttpHeaders = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     })
    //     return this.http.get(this.url + '/api/auth/subscribers/' + id, {headers:header})
    // }


    // Anouncer File
     getAnnouncerFiles() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/anouncer_files', {headers:header})
    }
    // End of Anouncer File

    // End of Announcer

    // Admin
    postAdminReq(name: string, parent_id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.post(this.url + '/api/auth/projects_center/create', {"name": name, "parent_id": parent_id}, {headers:header})
    }

    putAdminReq(id: number, name: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.put(this.url + '/api/auth/projects_center/update/' + id, {"name": name}, {headers:header})
    }

    getAdminReq() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/projects_center', {headers:header})
    }

    deleteAdminReq(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.delete(this.url + '/api/auth/projects_center/delete/' + id, {headers:header})
    }

    // Admin Payment
    getAdminPayReq() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/payments', {headers:header})
    }

    putAdminPayReq(id: number, status: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.put(this.url + '/api/auth/payments', {'id': id, 'status': status}, {headers:header})
    }
    // End of Admin Payment

    // Admin Project
    postAdminProReq(id: number, name: string, email: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.post(this.url + '/api/auth/projects/create', {"projects_center_id": id, "project_name": name, "email": email}, {headers:header})
    }

    putAdminProReq(id: number, name: string, email: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.put(this.url + '/api/auth/projects/' + id, {"name": name, "email": email}, {headers:header})
    }

    getAdminProReq(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/projects/' + id, {headers:header})
    }
    deleteAdminProReq(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.delete(this.url + '/api/auth/projects/' + id, {headers:header})
    }

    changePageRequest(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/authProject/' + id, {headers:header})
    }
    // End of Admin Project
    // End of Admin


    // Subscriber
    getSubsciberProjects() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/projects', {headers:header})
    }

    getSubsciberProjectsID(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/anouncements/' + id, {headers:header})
    }

    // Favourites
    postFavoutitesRequests(anouncements_id: any) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.post(this.url + '/api/auth/favorites', {"anouncement_id": anouncements_id}, {headers:header})
    }
    
    deleteFavoutitesRequests(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.delete(this.url + '/api/auth/favorites/' + id, {headers: header})
    }
    // End of Favourites


    // Announcement check
    postAnnouncementCheck(id:number, file: any) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.post(this.url + '/api/auth/payments', {"anouncements_id": id, "file": file}, {headers:header})
    }
    // End of Announcement check

    // Add Lots
    postOrderRequests(
        anouncements_id: number, 
        total: number, 
        total_dol: number, 
        total_euro: number, 
        vat: number, 
        vat_dol: number,
        vat_euro: number,
        discount: number,
        discount_dol: number,
        discount_euro: number,
        lots: any,
        partners: any,
        response_security_submited: any,
        file: any

        ) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.post(this.url + '/api/auth/orders', {
            "anouncement_id": anouncements_id, 
            "total": total, 
            "total_dol": total_dol, 
            "total_euro": total_euro,
            "vat": vat,
            "vat_dol": vat_dol,
            "vat_euro": vat_euro,
            "discount": discount, 
            "discount_dol": discount_dol,
            "discount_euro": discount_euro,
            'lots': lots,
            'partners': partners,
            'response_security_submited': response_security_submited,
            'files': file
        }, {headers:header})
    }
    // End of Add Lots
    
    // My Orders
    getOrderRequests() {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/orders', {headers:header})
    }

    deleteMyOrderRequests(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/orders/' + id, {headers:header})
    }

    // Show Lots 
    getOrderLotsRequests(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/order/' + id, {headers:header})
    }
    // End of Show Lots 

    // Change Lots
    putOrderLotsRequests(
        id: number,
        total: number, 
        total_dol: number, 
        total_euro: number, 
        vat: number, 
        vat_dol: number,
        vat_euro: number,
        discount: number,
        discount_dol: number,
        discount_euro: number,
        lots: any,
        partners: any,
        response_security_submited: any,
        file: any
        ) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.put(this.url + '/api/auth/order/' + id, {"total": total, "total_dol": total_dol, "total_euro": total_euro, "vat": vat, "vat_dol": vat_dol,"vat_euro": vat_euro,"discount": discount,"discount_dol": discount_dol,"discount_euro": discount_euro,"lots": lots,"files": file, 'response_security_submited': response_security_submited, 'partners': partners}, {headers:header})
    }

    deleteOrderRequests(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.delete(this.url + '/api/auth/order_file/' + id, {headers: header})
    }
    // End of Change Lots
    
    // End of My Orders
    //  End of Subscriber

    // Result Page
    getResultReq(id: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'token_type': 'bearer',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        return this.http.get(this.url + '/api/auth/protokol/' + id, {headers: header})
    }
    // End of Result Page

}