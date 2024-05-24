import { Router } from "express";
import { Register } from "./controller/auth/user.registration.controller";
import { AuthenticatedUser, Login, Logout } from "./controller/auth/user.authentication.controller";

export const routes = (router: Router) => {
    /*
    *   Authentication end-points
    */
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthenticatedUser);
    router.post('/api/logout', Logout);

}