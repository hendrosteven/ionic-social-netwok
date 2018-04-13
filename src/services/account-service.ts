import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Account } from '../classes/account';
import 'rxjs/Rx';
import { Login } from "../classes/login";

@Injectable()
export class AccountService{

    headers: any;
    options: any;
    url: string = 'https://ion-social.herokuapp.com'

    constructor(private http: Http){
        this.headers = new Headers({'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'});
        this.options = new RequestOptions({headers: this.headers});
    }

    loadAccount(token: string){
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Barier '+ token
        });
        this.options = new RequestOptions({headers : this.headers});
        return this.http.get(this.url,this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    register(account: Account){
        return this.http.post(this.url+'/register',account,this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    prosesLogin(login: Login){
        return this.http.post(this.url+'/login',login,this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    handleError(err){
        return Observable.throw(err.json().error || 'Server error');
    }
}