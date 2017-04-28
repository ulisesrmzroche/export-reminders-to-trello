const Reminders = Application('Reminders');

export const getBacklogReminders = () => {
  console.log('geting reminders...')

  const reminders = Reminders.reminders.whose({
    _and: [
      { name: { _contains: '#backlog' } },
      { completed: false },
    ],
  });
  return reminders;
};
