'use strict';

export const runStateList = (st, s) => st(s);
export const evalStateList = (st, s) => st(s).map(p => p.first);

export const _return = a => s => ({first: a, second: s});

export const fmap = (f, lst) => lst.map(f);
export const flatten = list => Array.prototype.concat.apply([], list);
export const flatMap = (f, lst) => flatten(lst.map(f));

export const nub = arr => arr.filter((v, i, self) => self.indexOf(v) === i);

export const bind = (g, k) => {
    return s => {
        let plst = g(s);
        return flatMap(p => {
            let { first: a, second: s1 } = p;
            let ka = k(a);

            return runStateList(ka, s1);
        }, plst);
    };
};

export const then = (g, k) => {
    return s => {
        let plst = g(s);
        return flatMap(p => {
            let s1 = p.second;
            let ka = k();

            return runStateList(ka, s1);
        }, plst);
    };
};

export const zero = () => s => [];

export const guard = b => {
    if (b) {
        return s => [{first: null, second: s}];
    } else {
        return zero();
    }
};

export const clone = obj => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};
