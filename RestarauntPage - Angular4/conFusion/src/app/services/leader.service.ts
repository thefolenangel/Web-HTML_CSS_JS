import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';
import { Http , Response} from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Rx';   //to include of operator used Rx instead of Objservable or use seperate- import 'rxjs/add/observable/of
// import 'rxjs/add/Operator/toPromise';
// import 'rxjs/add/Operator/delay';
import { RestangularModule, Restangular } from 'ngx-restangular';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular, private processHTTPMsgService : ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    // return Observable.of(LEADERS).delay(2000);
    return this.restangular.all('leaders').getList();
  }

  getLeader(id1: number): Observable<Leader>{
    // return Observable.of(LEADERS.filter((leader)=>(leader.id===id1))[0]).delay(2000);
    return this.restangular.one('leaders',id1).get();
  }

  getFeaturedLeader(): Observable<Leader>{
    // return Observable.of(LEADERS.filter((leader)=>(leader.featured))[0]).delay(2000);
    return this.restangular.all('leaders').getList({featured: true})
    .map(leaders1 => leaders1[0]);
  }

}