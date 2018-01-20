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

const adjustTypes = ( input, type ) => {
  let result; 
  if (type === 'string') {
    result = ('\"' + input + '\"'); 
  } else if (type === 'integer') {
    result = JSON.parse(input); 
  } else if (type === 'boolean') {
    result = JSON.parse(input); 
  } else if (type === 'array') {
    result = JSON.parse(input);
  } else {
    result = input;
  }
  return result;
}

const clientRun = async ({ io, room }, payload) => {
  log('running code from client. room.get("text") = ', room.get('text'));
  const { text, email, outputValue, inputValue } = payload;
  let { input, output } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;

  try {
    const { data } = await axios.post(`${url}/submit-code`, { code: text });
    let stdout = data;

    input = adjustTypes(input, inputValue);
    output = adjustTypes(output, outputValue);

    const funcName = text.split(' ')[1].split('(')[0];
    if (inputValue === 'array') {
      input = JSON.stringify(input)
    }
    const funcInvocation = funcName + '(' + input + ')';
    const result = eval(text + funcInvocation);
    if (typeof output === 'string') {
      output = JSON.parse(output);
    }
    const passed = JSON.stringify(result) === JSON.stringify(output);
    let score = '\n' + email; 
    if (passed) {
      score = score + ' WINS!'
    } else {
      score = score + ', incorrect submission'
    }
    serverRun({ io, room }, { stdout, email, score, passed });
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
