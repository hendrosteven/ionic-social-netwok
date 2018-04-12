import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Account } from '../classes/account';
import 'rxjs/Rx';

@Injectable()
export class AccountService{

    headers: any;
    options: any;
    url: string = 'http://ionic.kelaskoding.com'

    constructor(private http: Http){
        this.headers = new Headers({'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'});
        this.options = new RequestOptions({headers: this.headers});
    }

    register(account: Account){
        return this.http.post(this.url+'/register',account,this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    handleError(err){
        return Observable.throw(err.json().error || 'Server error');
    }
}