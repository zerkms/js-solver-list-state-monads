'use strict';

import * as m_ from './utils.js';

const select = list => {
    if (list.length === 0) {
        return [];
    }

    let [x, ...xs] = list;

    let head = [{first: x, second: xs}],
        tail = select(xs).map(p => ({first: p.first, second: [x].concat(p.second)}));
    return head.concat(tail);
};

const asNumber = lst => lst.reduce((acc, i) => acc * 10 + i, 0);
const isFirstLetter = letter => str => str[0] === letter;
const numberFromState = (str, state) => asNumber(str.split('').map(v => state[v]));
const uniqueLetters = arr => m_.nub(m_.flatten(arr.map(v => v.split(''))));

const constraintFirstLetter = (letter, state, eq, bind) => {
    let isFirst = isFirstLetter(letter),
        br = (isFirst(eq.a) || isFirst(eq.b) || isFirst(eq.sum)) && state[letter] == 0;

    return m_.then(m_.guard(!br), bind);
};

const constraintSumLength = (letter, state, eq, bind) => {
    let br = eq.sum[0] == letter && eq.sum.length > Math.max(eq.a.length, eq.b.length) && state[eq.sum[0]] != 1;
    return m_.then(m_.guard(!br), bind);
};

const constraint = (letter, state, eq, bind) => {
    return [constraintSumLength, constraintFirstLetter].reduce(
        (acc, v) => () => v(letter, state, eq, acc),
        bind
    )();
};

const go = (rest, state, i, eq) => {
    let [head, ...tail] = rest,
        newState = m_.clone(state);
    newState[head] = i;

    if (tail.length === 0) {
        return prune(eq, newState);
    }

    return constraint(head, newState, eq, () => m_.bind(select, x => go(tail, newState, x, eq)));
};

const prune = (eq, state) => {
    let a = numberFromState(eq.a, state),
        b = numberFromState(eq.b, state),
        sum = numberFromState(eq.sum, state);

    return m_.then(m_.guard(a + b == sum), () => {
        return m_._return([a, b, sum]);
    });
};

const solve = (a, b, sum) => m_.bind(select, s => go(uniqueLetters([a, b, sum]), {}, s, {a, b, sum}));

let solutions = m_.evalStateList(solve('send', 'more', 'money'), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log('Solutions found: ');
console.log(solutions);
