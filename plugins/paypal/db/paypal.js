const knex = appRequire('init/knex').knex;
const tableName = 'paypal';

const config = appRequire('services/config').all();
const createTable = async () => {
  if(config.empty) {
    await knex.schema.dropTableIfExists(tableName);
  }
  const exist = await knex.schema.hasTable(tableName);
  if(exist) {
    return;
  }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('orderId').unique();
    table.string('paypalId').unique();
    table.integer('orderType').defaultTo(3);
    table.string('amount');
    table.integer('user');
    table.integer('account');
    table.string('status');
    table.string('paypalData', 4096);
    table.bigInteger('createTime');
  });
};

exports.createTable = createTable;
