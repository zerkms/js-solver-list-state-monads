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

let asNumber = lst => lst.reduce((acc, i) => acc * 10 + i, 0);

function solve(progress) {
    return m_.bind(select, s => {
    return m_.bind(select, e => {
    return m_.bind(select, n => {
    return m_.bind(select, d => {
    return m_.bind(select, m => {
    return m_.bind(select, o => {
    return m_.bind(select, r => {
    return m_.bind(select, y => {
        let done = s * 10 + e;
        progress(done);

        return m_.then(m_.guard(s != 0 && m != 0), () => {
            let send = asNumber([s, e, n, d]),
                more = asNumber([m, o, r, e]),
                money = asNumber([m, o, n, e, y]);

            return m_.then(m_.guard(send + more == money), () => {
                return m_._return([send, more, money]);
            });
        });
    }); }); }); }); }); }); }) });
}

let progress = () => {
    let lastShown;

    return p => {
        if (p % 10 === 0 && lastShown != p) {
            lastShown = p;
            console.log(`${p}%`)
        }
    }
};
let solutions = m_.evalStateList(solve(progress()), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log('Solutions found: ');
console.log(solutions);
