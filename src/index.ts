import events from 'events';
import app from './components/express_app.js';

// Event
const emitter = new events.EventEmitter();
emitter.on('start', function(message){
    console.log(message)
});



app.listen(3001, () => { 
    emitter.emit('start', 'listening on port 3001')
});
