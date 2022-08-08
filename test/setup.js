/**
 * In trying to migrate to Mocha, we decided to keep using chai.
 * Required some hacks to combine Jest and Chai matchers.
 * Following this article:
 * https://ebaytech.berlin/into-the-great-unknown-migrating-from-mocha-to-jest-3baced083c7e
 */

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import chaiJestSnapshot from 'chai-jest-snapshot';
require('@testing-library/jest-dom');
require('regenerator-runtime/runtime');

configure({ adapter: new Adapter() });

chai.use(require('chai-string'));
chai.use(require('chai-dom'));
chai.use(require('chai-style'));
chai.use(require('chai-css'));
chai.use(require('chai-enzyme')());
chai.use(require('chai-as-promised'));
chai.use(chaiJestSnapshot);

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot); // eslint-disable-line
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
  },
});

// Combine both jest and chai matchers on expect
const jestExpect = global.expect;

global.expect = (actual) => {
  const originalMatchers = jestExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers); // eslint-disable-line
  return combinedMatchers;
};
// Retain the expect methods: https://jestjs.io/docs/27.x/expect#methods
Object.keys(jestExpect).forEach((expectKey) => {
  global.expect[expectKey] = jestExpect[expectKey];
});
