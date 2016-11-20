const Podium = require('podium');

const test = require('tape');


/******

 const podium = new Podium({

   // event name
   name: 'eventName',

   // event channel(s) available
   channels: ['channel1', 'channel2'] || false,

   // cloned before passed, default false - passed as-is
   clone: true || false,

   // listener calls each object in array one by one
   // with each individual argument
   spread: true || false,

   // appended to args list at the end (tag key, value true)
   tags: ['tag1', 'tag2', 'tag3'] || false,

   // same event name can be registered multiple times
   shared: true || false

 });


 *****/


test('test podium', (t) => {

    test('test new podium object', (t) => {
        const podium = new Podium();

        t.ok(podium, 'Is initialized');
        t.ok(typeof podium === 'object', 'Is an object');
        t.ok(podium instanceof Podium, 'Instance of Podium');

        t.end();
    });

    test('test new object with event', (t) => {
        const podium = new Podium('event1');

        podium.on('event1', (data) => {
            t.ok(data, 'Emitted data is defined');
            t.equal(data.a, 1, 'Emitted value is the same');

            podium.removeAllListeners('event1');
        });

        podium.emit('event1', { a: 1 });

        t.end();
    });

    test('test new object with multiple events', (t) => {
        const podium = new Podium('event2');

        podium.on('event2', (data) => {
            t.ok(data, 'Emitted data is defined');

            const [a, b, c] = data;

            t.equal(a.a, 1, 'Emitted value is the same');
            t.equal(b.b, 2, 'Emitted value is the same');
            t.equal(c.c, 3, 'Emitted value is the same');

            podium.removeAllListeners('event2');
        });

        podium.emit('event2', [{ a: 1 }, { b: 2 }, { c: 3 }]);

        t.end();
    });

    test('test podium channels', (t) => {

        const podium1 = new Podium({
            name: 'event1',
            channels: ['channel1', 'channel2']
        });

        podium1.on({name: 'event1', channels: ['channel1']}, (data) => {
            t.ok(data, 'Emitted data is defined');

            const {a, b} = data;

            t.equal(a, 1, 'Emitted value is the same');
            t.equal(b, 2, 'Emitted value is the same');
        });

        podium1.on({name: 'event1', channels: ['channel2']}, (data) => {
            t.ok(data, 'Emitted data is defined');

            const {a, b} = data;

            t.equal(a, 3, 'Emitted value is the same');
            t.equal(b, 4, 'Emitted value is the same');
        });

        podium1.emit({name: 'event1', channel: 'channel1'}, {a:1, b:2}, () => {
            console.log(`channel1 - everyone notified!`);
        });

        podium1.emit({name: 'event1', channel: 'channel2'}, {a:3, b:4}, () => {
            console.log(`channel2 - everyone notified!`);
        });

        t.end();
    });

    t.end();

});