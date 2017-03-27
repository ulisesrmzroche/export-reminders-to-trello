import { write } from './../utils';

const Reminders = Application('Reminders');

const backlog = Reminders.lists.whose({ name: '#backlog' })[0];
const reminders = backlog.reminders.whose({ completed: false });

export default () => {
  const _reminders = [];
  reminders().forEach((reminder) => {
    const _reminder = {
      name: reminder.name(),
      body: reminder.body(),
    };
    _reminders.push(_reminder);
  });
  write(JSON.stringify({
    reminders: _reminders,
  }), './dist/reminders.json');
  Reminders.delete(reminders);
};
