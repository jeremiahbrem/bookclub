
// accepts all or partial list of properties to update
function sqlForPartialUpdate(table, items, key, id) {

  let idx = 1;
  let columns = [];

  for (let column in items) {
    columns.push(`${column}=$${idx}`);
    idx += 1;
  }

  let cols = columns.join(", ");
  let query = `UPDATE ${table} SET ${cols} WHERE ${key}=$${idx} RETURNING *`;

  let values = Object.values(items);
  values.push(id);

  return { query, values };
}

module.exports = sqlForPartialUpdate;
