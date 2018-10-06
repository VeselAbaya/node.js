let person = {
  name: 'Antay',
  surname: 'Juskovets'
};

debugger;

person.age = 19;
person.birth = new Date('October 13, 1998');
console.log(person);

person.lived_days = (Date.now() - person.birth) / 1000 / 3600 / 24;
console.log(person);
