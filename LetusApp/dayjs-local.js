// Load dayjs, plugins and language packs.
import dayjs from 'dayjs-ext';
// import "timeZone-1900-2050", "timeZone-1970-2038"
// or "timeZone-2012-2022" to save your package size
import timeZonePlugin from 'dayjs-ext/plugin/timeZone';
import customParseFormat from 'dayjs-ext/plugin/customParseFormat';
import localizableFormat from 'dayjs-ext/plugin/localizableFormat';
import relativeTime from 'dayjs-ext/plugin/relativeTime';

// Register plugins and language packs; Czech will be the default language.
dayjs
  .extend(timeZonePlugin)
  .extend(customParseFormat)
  .extend(localizableFormat)
  .extend(relativeTime);

export default dayjs;
