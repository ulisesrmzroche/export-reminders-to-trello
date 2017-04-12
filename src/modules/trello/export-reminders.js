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
    return resolve(data);
  });
});

const addCheckListToCard = (checklist, card) => {
  const endpoint = `/1/cards/${card.id}/checklists`;
  const _checklist = checklist || {
    name: 'Requirements',
  };
  return new Promise((resolve, reject) => t.post(endpoint, _checklist, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  }));
};

const addCheckListsToCards = (cards) => {
  console.log('Adding checklists to cards...');
  const requests = [];
  requests.push(cards.map(card => addCheckListToCard({
    name: 'Requirements',
  }, card)));
  requests.push(cards.map(card => addCheckListToCard({
    name: 'TODO',
  }, card)));
  return Promise.all(requests);
};

const readReminders = () => new Promise((resolve, reject) => {
  console.log('Reading reminders...');
  fs.readFile(`${ENV.ROOT_PATH}/dist/reminders.json`, 'utf8', (err, data) => {
    if (err) return reject(err);
    const json = JSON.parse(data);
    return resolve(json.reminders);
  });
});

const exportReminders = (reminders) => {
  console.log('Exporting reminders...');
  return Promise.all(reminders.map(reminder => postCard(reminder)));
};

export default () => {
  readReminders()
  .then(reminders => exportReminders(reminders))
  .then(cards => addCheckListsToCards(cards))
  .then(() => {
    console.log('made all this stuf!');
  })
  .catch(() => {
    console.log('fail');
  });
};
