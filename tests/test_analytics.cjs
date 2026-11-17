'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const ctx = vm.createContext({});
vm.runInContext(
  fs.readFileSync('dist/customer-data.js', 'utf8') +
  fs.readFileSync('dist/experiences.js', 'utf8') +
  fs.readFileSync('dist/analytics.js', 'utf8'),
  ctx
);

// 1. Check VietGAP Economic Simulator
const sim0 = vm.runInContext('calculateSimulator(0)', ctx);
assert.equal(sim0.vietgapProdTons, 0);
assert.equal(sim0.addedValueMil, 0);

const sim30 = vm.runInContext('calculateSimulator(30)', ctx);
assert.equal(sim30.vietgapProdTons, 30 * 18.1); // 543 tons
assert.ok(sim30.addedValueMil > 0, 'Economic added value must be strictly positive');
assert.ok(Math.abs(sim30.addedValueMil - 1900.5) < 0.01, 'Added value is 1,900.5 million VND');
assert.equal(sim30.chemicalReductionPct, 15); // Math.round(30/90 * 45) = 15%

// 2. Check AHP Dynamic Weights
vm.runInContext('setAhpWeights(50, 30, 20)', ctx);
const w = vm.runInContext('ahpWeights', ctx);
assert.equal(w.interest + w.season + w.time, 100);

// 3. Check Spatial Distance Calculation
const appCode = fs.readFileSync('dist/app.js', 'utf8');
vm.runInContext(appCode.slice(appCode.indexOf('function haversineDist('), appCode.indexOf('function areaHa(')), ctx);
const d = vm.runInContext('haversineDist(22.600, 106.191, 22.600, 106.191)', ctx);
assert.equal(d, 0, 'Zero distance for identical coordinates');
const d1km = vm.runInContext('haversineDist(22.600, 106.191, 22.609, 106.191)', ctx);
assert.ok(d1km > 900 && d1km < 1100, 'Around 1000m for 0.009 deg latitude');

console.log('All 6 analytics, AHP and spatial distance tests passed successfully!');
