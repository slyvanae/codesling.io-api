import axios from 'axios';

import log from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
} from './serverEvents';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  log('client ready heard');
  serverInitialState({ io, client, room }, payload);
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
  log('client update heard. payload.text = ', payload);
  room.set('text', text);
  room.set('email', email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, room }) => {
  log('client disconnected');
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  log('running code from client. room.get("text") = ', room.get('text'));
  const { text, email } = payload;
  let { input, output } = payload; 
  const url = process.env.CODERUNNER_SERVICE_URL;

  try {
    const { data } = await axios.post(`${url}/submit-code`, { code: text });
    const stdout = data;
    console.log('input', input, typeof input); 
    console.log('output', output, typeof JSON.parse(output)); 
    if (typeof input === 'string') {
      input = '\'' + input + '\''; 
    }
    // if (typeof output === 'string') {
    //   output = '\"' + output + '\"'; 
    // }
    let funcName = text.split(' ')[1].split('(')[0];  
    let funcInvocation = funcName + '(' + input + ')'; 
    let result = eval(text + funcInvocation); 
    let passed = result === JSON.parse(output); 
    console.log('eval', typeof result); 
    console.log('passed', passed); 
    serverRun({ io, room }, { stdout, email, passed });
  } catch (e) {
    log('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = ({ io, room }, payload) => {
  log('client message heard');
  serverMessage({ io, room }, payload);
};

const clientEmitters = {
  'client.ready': clientReady,
  'client.update': clientUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
};

export default clientEmitters;
