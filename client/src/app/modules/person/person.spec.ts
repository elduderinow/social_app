import { Person } from './person';

describe('Person', () => {
  it('should create an instance', () => {
    expect(new Person("","","","","","","","",0,"")).toBeTruthy();
  });
});
