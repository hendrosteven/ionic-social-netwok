
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendService{
    headers: any;
    options: any;
    url: string = 'https://ion-social.herokuapp.com';

    constructor(private http: Http){
        
    }

    findAllFriend(token: string){
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Barier '+ token
        });
        this.options = new RequestOptions({headers : this.headers});

        return this.http.get(this.url + '/friend/me', this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    addFriend(fId: number, token: string){
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Barier '+ token
        });
        this.options = new RequestOptions({headers : this.headers});

        return this.http.post(this.url + '/friend/add',{friendId: fId}, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    handleError(error){
        return Observable.throw(error.json().error || 'Servier error');
    }
}