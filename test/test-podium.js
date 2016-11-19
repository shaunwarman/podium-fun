const Podium = require('podium');

const test = require('tape');


test('test podium', (t) => {

    test('test new podium object', (t) => {
        const podium = new Podium();

        t.ok(podium, 'Podium object created');
        t.ok(typeof podium === 'object', 'Not an object!');
        t.ok(podium instanceof Podium, 'Not an instance of Podium!');

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

    t.end();

});