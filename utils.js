'use strict';

export const fmap = (f, lst) => lst.map(f);

export const runStateList = (st, s) => st(s);
export const evalStateList = (st, s) => st(s).map(p => p.first);

export const _return = a => s => ({first: a, second: s});

export const bind = (g, k) => {
    return s => {
        let plst = g(s);
        let lst2 = fmap(p => {
            let { first: a, second: s1 } = p;
            let ka = k(a);

            let result = runStateList(ka, s1);
            return result;
        }, plst);

        return Array.prototype.concat.apply([], lst2);
    };
};

export const then = (g, k) => {
    return s => {
        let plst = g(s);
        let lst2 = fmap(p => {
            let s1 = p.second;
            let ka = k();
            let result = runStateList(ka, s1);
            return result;
        }, plst);

        return Array.prototype.concat.apply([], lst2);
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
