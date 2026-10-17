import {shouldShowStars} from './githubStars.ts';

test('star badge only shows at 5 stars or more', () => {
  expect(shouldShowStars(undefined)).toBe(false);
  expect(shouldShowStars(0)).toBe(false);
  expect(shouldShowStars(4)).toBe(false);
  expect(shouldShowStars(5)).toBe(true);
  expect(shouldShowStars(120)).toBe(true);
});
