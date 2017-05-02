import {
  getBacklogReminders,
  deleteReminders,
  writeRemindersToJSON,
  processReminders,
} from './../actions';

export default () => {
  const reminders = getBacklogReminders();
  writeRemindersToJSON(processReminders(reminders));
  deleteReminders(reminders);
};
