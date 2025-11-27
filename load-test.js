import autocannon from 'autocannon';

const runLoadTest = () => {
    const instance = autocannon({
        url: 'http://localhost:5173',
        connections: 10, // default
        pipelining: 1, // default
        duration: 10 // default
    }, console.log);

    // this is used to kill the instance on CTRL-C
    process.once('SIGINT', () => {
        instance.stop();
    });

    autocannon.track(instance, { renderProgressBar: true });
}

runLoadTest();
