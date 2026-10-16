// Seasonal site themes. Matrix (static/site.css) is the base theme; each entry
// here layers static/themes/<name>.css on top of it from `before` days ahead of
// the holiday through `after` days past it (visitor's local time). Visitors can
// also pick one from the header switcher; their pick lasts until the next
// season boundary.
//
// `date` is either a fixed 'MM-DD' or a floating rule like
// { month: 11, weekday: 4, nth: 4 } (4th Thursday of November; weekday 0 = Sun).
export default [
  { name: 'matrix', label: 'Matrix', icon: '▓' },
  { name: 'halloween', label: 'Halloween', icon: '🎃', date: '10-31', before: 14, after: 0 },
  {
    name: 'thanksgiving',
    label: 'Thanksgiving',
    icon: '🦃',
    date: { month: 11, weekday: 4, nth: 4 },
    before: 14,
    after: 3, // through the long weekend
  },
];
