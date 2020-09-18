//
// console.log(2)
//
// import _ from 'lodash';
//
// declare var GLOBAL:any;
// console.log(_.shuffle([1, 2, 3, 4]))
//
// console.log(GLOBAL)
//
// console.log(4)

import 'reflect-metadata';

import { plainToClass } from 'class-transformer';


import {Product} from  './product.model';
const products=[
    {title:'A CarPet',price:28.22},
    {title:'A Book',price:12.33}
]
// const p1=new Product('A Book',12.99)
// const loadedProducts=products.map(prod=>{
//     return new Product(prod.title,prod.price)
// })

const loadedProducts=plainToClass(Product,products)
for(const prod of loadedProducts){
    console.log(prod.getInfomation())
}
// console.log(p1.getInfomation())


//class-validator
import {validate} from 'class-validator'

const newProd=new Product('',-3.3)
validate(newProd).then(errors=>{
    if(errors.length>0){
        console.log('VALIDATION ERROS')
        console.log(errors)
    }else {
        console.log('validation succeed',newProd.getInfomation());
    }

})

