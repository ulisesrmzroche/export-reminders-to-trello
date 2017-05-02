import { write } from './../utils';

const Reminders = Application('Reminders');

export const getBacklogReminders = () => {
  console.log('geting reminders...');
  return Reminders.reminders.whose({
    _and: [
      { name: { _contains: '#backlog' } },
      { completed: false },
    ],
  });
};

export const deleteReminders = (reminders) => {
  console.log('deleting reminders...');
  Reminders.delete(reminders);
};

export const writeRemindersToJSON = (reminders) => {
  console.log('writing reminders to json...');
  write(JSON.stringify({
    reminders,
  }), './dist/reminders.json');
};

export const processReminders = (reminders) => {
  console.log('processing reminders...');
  const _reminders = [];
  reminders().forEach((reminder) => {
    const _reminder = {
      name: reminder.name().replace(/#backlog/g, ''),
      body: reminder.body(),
    };
    console.log(`Creating reminder...: ${_reminder.name}`);
    _reminders.push(_reminder);
  });
  return _reminders;
};
