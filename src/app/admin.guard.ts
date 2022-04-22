import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('access_token')) {
            var token: any = localStorage.getItem('access_token')
            var decoded:any = jwt_decode(token);
            if(decoded.role == "admin") {
                return true
            }
        }
        this.router.navigate(['/'])
        return false
    }
}