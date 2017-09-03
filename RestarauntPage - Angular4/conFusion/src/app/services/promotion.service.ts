import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
// import { PROMOTIONS } from '../shared/promotions';
import { Http , Response} from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Rx';   //to include of operator used Rx instead of Objservable or use seperate- import 'rxjs/add/observable/of
// import 'rxjs/add/Operator/toPromise';
// import 'rxjs/add/Operator/delay';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular, private processHTTPMsgService : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    // return Observable.of(PROMOTIONS).delay(2000);
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id1 : number) : Observable<Promotion>{
    // return Observable.of(PROMOTIONS.filter((promo)=>(promo.id===id1))[0]).delay(2000);
    return this.restangular.one('promotions',id1).get();
  }

  getFeaturedPromotion(): Observable<Promotion>{
    // return Observable.of(PROMOTIONS.filter((promo)=>(promo.featured))[0]).delay(2000);
    return this.restangular.all('promotions').getList({featured: true})
    .map(promotions1 => promotions1[0]);
  }
}
