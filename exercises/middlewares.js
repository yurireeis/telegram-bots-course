// middleware pattern (chain of responsibility)
// functional programming here

// ...middlewares = collection (array) of functions (spread operator = ES2015)
const exec = (context, ...middlewares) => {
    const run = index => {
        middlewares && index < middlewares.length && middlewares[index](context, () => run(index + 1))
        // here in the last parameter we have an example of functional programming
    };
    run(0);
};

const middleware1 = (context, next) => {
    context.info1 = 'mid1';
    next();
};

const middleware2 = (context, next) => {
    context.info2 = 'mid2';
    next();
};

// end here (doesn't call next)
const middleware3 = context => context.info3 = 'mid3';

const context = {};

exec(context, middleware1, middleware2, middleware3);

console.log(context);
