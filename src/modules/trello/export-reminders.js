// Export Remiders to Trello

import Trello from 'node-trello';
import fs from 'fs';
import ENV from './../../../config/environment';

const t = new Trello(ENV.INTEGRATIONS.trello.devKey, ENV.INTEGRATIONS.trello.devToken);

// Build Requests
const postCard = reminder => new Promise((resolve, reject) => {
  t.post('/1/cards', {
    name: reminder.name,
    idList: ENV.INTEGRATIONS.trello.targetList,
  }, (err, data) => {
    if (err) return reject(err);
    console.log('data', data);
    return resolve(data);
  });
});


const addCheckListToCard = (card) => {

};

const readReminders = () => {
  return new Promise((resolve, reject) => {
    return fs.readFile(`${ENV.ROOT_PATH}/dist/reminders.json`, 'utf8', (err, data) => {
      console.log(data)
      if (err) return reject(err);
      const json = JSON.parse(data);
      console.log(json)
      return resolve(json);
    });
  });
};

export default () => {
  readReminders()
  .then((remindersJSON) => {
    const reminders = [];
    remindersJSON.reminders.forEach((reminder) => {
      reminders.push(postCard(reminder));
    });
    return reminders;
  })
  .then((_reminders)=>{
    return Promise.all(_reminders)
    .then(() => {
      console.log('made all this stuf!');
    })
    .catch(() => {
      console.log('fail');
    });
  });
};
