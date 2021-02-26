'use strict';

const { CONFLICT, NO_CONTENT } = require('http-status');
const { Sequelize, Vehicle } = require('../common/database');
const { createError } = require('../common/errors');
const map = require('lodash/map');
const pick = require('lodash/pick');

const { Op } = Sequelize;

const inputAttrs = ['make', 'model', 'year'];

const createFilter = q => map(['make', 'year', 'model'],
  it => ({ [it]: { [Op.iLike]: `%${q}%` } }));

async function list({ query, options }, res) {
  const { filter } = query;
  const where = { [Op.and]: [] };
  if (filter) where[Op.or] = createFilter(filter);
  const { rows, count } = await Vehicle.findAndCountAll({ ...options, where });
  return res.jsend.success({ items: rows, total: count });
}

async function create({ body }, res) {
  const payload = pick(body, inputAttrs);
  const [err, vehicle] = await Vehicle.restoreOrCreate(payload);
  if (err) return createError(CONFLICT, 'Vehicle exists!');
  return res.jsend.success(vehicle);
}

async function remove({ vehicle }, res) {
  await vehicle.destroy();
  return res.sendStatus(NO_CONTENT);
}

module.exports = {
  list,
  create,
  remove
};