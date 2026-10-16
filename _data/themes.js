// Seasonal site themes. Matrix (static/site.css) is the base theme; each entry
// here layers static/themes/<name>.css on top of it from `before` days ahead of
// the holiday through `after` days past it (visitor's local time). Visitors can
// also pick one from the header switcher; their pick lasts until the next
// season boundary.
//
// `date` is either a fixed 'MM-DD' or a floating rule like
// { month: 11, weekday: 4, nth: 4 } (4th Thursday of November; weekday 0 = Sun;
// nth: -1 = last). Listed in calendar order; the first active window wins.
export default [
  { name: 'matrix', label: 'Matrix', icon: '▓' },
  { name: 'valentines', label: "Valentine's Day", icon: '💘', date: '02-14' },
  {
    name: 'baseball',
    label: 'Opening Week',
    icon: '⚾',
    // MLB Opening Day is usually the last Thursday of March; run the week
    date: { month: 3, weekday: 4, nth: -1 },
    after: 6,
  },
  { name: 'independence', label: 'Independence Day', icon: '🎆', date: '07-04' },
  { name: 'halloween', label: 'Halloween', icon: '🎃', date: '10-31', before: 14, after: 0 },
  {
    name: 'thanksgiving',
    label: 'Thanksgiving',
    icon: '🦃',
    date: { month: 11, weekday: 4, nth: 4 },
    before: 14,
    after: 3, // through the long weekend
  },
  { name: 'christmas', label: 'Christmas', icon: '🎄', date: '12-25', before: 24, after: 0 },
];
