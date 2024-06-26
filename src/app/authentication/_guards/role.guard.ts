    import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// services
import { AuthenticationService } from "../_service/authentication.service";

@Injectable({
    providedIn: "root",
})
export class RoleAuthGuard implements CanActivate {
    users: any[] = [];
    LoggedinEmail: string = "";

    constructor(

        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
         const roleToken = localStorage.getItem('role');
         if (!roleToken) {
             this.router.navigate(['/login']); 
             return false;
         }
         
    const requiredRoles = route.data["role"] as string[];
    if (requiredRoles.includes(roleToken) || requiredRoles.includes('admin') && roleToken === 'superAdmin') {
        return true;
    } else {
        switch(roleToken){
            case "admin":
            case "superAdmin":
                this.router.navigate(['/timesheet']);  
                break;
            case "user":
                this.router.navigate(['/timesheet']); 
                break;
            default:
                console.log("error in role");
        }
    }
    return false;
     }
    }
