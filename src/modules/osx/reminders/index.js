import { write } from './../utils';
import { getBacklogReminders, deleteReminders } from './../actions';

export default () => {
  const reminders = getBacklogReminders();
  const _reminders = [];

  reminders().forEach((reminder) => {
    const _reminder = {
      name: reminder.name(),
      body: reminder.body(),
    };
    console.log(`Creating reminder...: ${_reminder.name}`);
    _reminders.push(_reminder);
  });

  console.log('writing reminders to json...');
  write(JSON.stringify({
    reminders: _reminders,
  }), './dist/reminders.json');

  deleteReminders(reminders);
};
