// setTimeout(() => console.log('I\'m come after thw execution stack has empty :)'), 0);
let start = Date.now();
for (let i = 0; i != 10000000000; ++i);
let finish = Date.now();
console.log("finish", (finish - start) / 1000 );
