# Kiraya Register

A private record-keeping app for rented property. It tracks the monthly rent and
every utility bill for each property, and it never loses a reference number again.

All data is stored on the device that opens it. Nothing is sent to a server.

## What it does

- One entry per property, with tenant name, phone, monthly rent, rent due date
  and security deposit.
- As many meters per property as the property actually has. A house with a
  separate shop meter, or two electricity connections, gets one row per meter.
  Each meter keeps its own reference number and its own monthly bill.
- Electricity, gas and water are labelled by the actual provider: MEPCO, SNGPL,
  WASA, and the other DISCOs including K-Electric and SSGC.
- One tap copies a reference number, one tap opens the provider's bill page.
- A twelve month grid per property shows at a glance who settles on time.
- A WhatsApp rent reminder (or a receipt once paid) is drafted for the tenant. You send it yourself.

## New in version 3.0

- Complete redesign: premium dark and emerald look, light and dark themes.
- Home: outstanding amount, collection progress, "Needs attention" list of overdue
  bills, and filters for All, Pending, Overdue and Paid. Undo after every tick.
- Properties: search by name, tenant, phone or reference number; filter rented or
  own; sort by name, rent or amount due.
- Reports: monthly collection chart, this month by type, and a 12-month payment
  record for every property. Export all records as CSV for Excel.
- Settings: your name, app name, theme, default rent due day, default
  electricity company, editable WhatsApp reminder and receipt messages, backup
  file download, restore from file or text, sample data and erase.

## Installing it on a phone

1. Create a new GitHub repository named `Kiraya`.
2. Upload all files from this folder into the root of that repository. Not
   inside a sub-folder.
3. Open Settings, then Pages. Set Source to "Deploy from a branch", Branch to
   `main`, Folder to `/ (root)`. Save.
4. After a couple of minutes the site is live, for example:
   https://itsahmar-818.github.io/Kiraya/
5. Open that link in Chrome on the phone, open the menu, and choose
   "Install app".

Installed this way it gets its own icon with no browser badge, opens without an
address bar, and works with no internet connection.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app |
| `manifest.webmanifest` | App name, icons and standalone display |
| `sw.js` | Service worker, makes it work offline |
| `icon-192.png` | Small icon |
| `icon-512.png` | Large icon |
| `icon-512-maskable.png` | Android adaptive icon |
| `apple-touch-icon.png` | iPhone home screen icon |

## Backups

The data lives in the browser storage of the phone that opens the app. Changing
phones or clearing browser data will erase it. Once a month, open Settings and
tap "Download backup file" (or "Copy backup text" and send it to yourself on
WhatsApp). "Restore a backup" brings everything back from that file or text.
Updating to a new version keeps all existing data.
