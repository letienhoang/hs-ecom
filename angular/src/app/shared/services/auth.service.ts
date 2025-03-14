import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginReqestDto } from "../models/login-request.dto";
import { LoginResponseDto } from "../models/login-response.dto";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/key.const";
import { TokenStorageService } from "./token.service";


@Injectable({
    providedIn:'root',
})
export class AuthService{

    constructor(
        private httClient: HttpClient,
        private tokenService: TokenStorageService
    ) {}

    public login(input: LoginReqestDto): Observable <LoginResponseDto>{
        var body = {
            username: input.username,
            password: input.password,
            client_id: environment.oAuthConfig.clientId,
            client_secret: environment.oAuthConfig.dummyClientSecret,
            grant_type: 'password',
            scope: environment.oAuthConfig.scope
        }

        const data = Object.keys(body).map((key,index) => `${key}=${encodeURIComponent(body[key])}`).join('&');

        return this.httClient.post<LoginResponseDto>(
            environment.oAuthConfig.issuer+'connect/token',
            data,
            { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        );
    };

    public refreshToken(refreshToken: string): Observable <LoginResponseDto>{
        var body = {
            client_id: environment.oAuthConfig.clientId,
            client_secret: environment.oAuthConfig.dummyClientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }

        const data = Object.keys(body).map((key,index) => `${key}=${encodeURIComponent(body[key])}`).join('&');

        return this.httClient.post<LoginResponseDto>(
            environment.oAuthConfig.issuer+'connect/token',
            data,
            { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        );
    };
    
    public isAuthenticated(): boolean{
        return this.tokenService.getToken() != null;
    }

    public logout(){
        this.tokenService.signOut();
    }
}