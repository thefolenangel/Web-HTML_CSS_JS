import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
@Injectable()
export class DishService {

  constructor() { }
  getDishes(): Dish[]{
    return DISHES;
  }
  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }

  getDish(id): Dish {
    return DISHES.filter((dish) => (dish.id==id))[0];
  }

  
}

