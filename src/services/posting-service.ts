import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Posting } from "../classes/posting";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostingService{

    headers: any;
    options: any;
    url: string = 'https://ion-social.herokuapp.com';

    constructor(private http: Http){

    }

    savePosting(posting: Posting, token: string){
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Barier '+ token
        });
        this.options = new RequestOptions({headers : this.headers});

        return this.http.post(this.url + '/posting', posting, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    handleError(error){
        return Observable.throw(error.json().error || 'Servier error');
    }

}