const Reminders = Application('Reminders');
Reminders.includeStandardAdditions = true;

export const write = (strContent, strPath) => {
  let error;
  const str = $.NSString.alloc.initWithUTF8String(strContent);
  str.writeToFileAtomicallyEncodingError(
    $(strPath).stringByStandardizingPath,
    true,
    $.NSUTF8StringEncoding,
    null);
    if (error) throw Error('Could not write file "' + strPath + '"');
}
