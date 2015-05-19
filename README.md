A demo project to practice working with State and List monads in JS.

The implementation and idea are inspired by the following amazing articles:

* [Using Monads in C++ to Solve Constraints: 1. The List Monad](http://bartoszmilewski.com/2015/05/11/using-monads-in-c-to-solve-constraints-1-the-list-monad/)
* [Using Monads in C++ to Solve Constraints: 2. The State Monad](http://bartoszmilewski.com/2015/05/14/using-monads-in-c-to-solve-constraints-2-the-state-monad/)
* [Using Monads in C++ to Solve Constraints: 3. The Tale of Two Monads](http://bartoszmilewski.com/2015/05/18/using-monads-in-c-to-solve-constraints-3-the-tale-of-two-monads/)
* [Unique sample drawing & searches with List and StateT — “Send more money”](http://blog.jle.im/entry/unique-sample-drawing-searches-with-list-and-statet)
* [The State Monad: A Tutorial for the Confused?](http://brandon.si/code/the-state-monad-a-tutorial-for-the-confused/)

How to run
----------

    # first install dependencies with 
    npm install
    
    # then run
    npm run-script solve
    
On my machine the output looks like

    $ time npm run-script solve
    
    > @ solve ...
    > babel-node index.js
    
    10%
    20%
    30%
    40%
    50%
    60%
    70%
    80%
    90%
    Solutions found:
    [ [ 9567, 1085, 10652 ] ]
    
    real    0m22.239s
    user    0m19.401s
    sys     0m2.673s
