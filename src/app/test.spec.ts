import { Calculator } from "./testservice";

describe('testservice',()=>{
    it('Should add two numbers',()=>{
        const service = new Calculator();
        expect(service.add(2,2)).toBe(4);
    });
    it('Should add two numbers',()=>{
        const service = new Calculator();
        expect(service.substract(2,2)).toBe(0);
    });
})