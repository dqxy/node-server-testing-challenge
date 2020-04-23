exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('pelicans')
    .truncate()
    .then(function() {
      return knex('pelicans').insert([
        { name: 'sam' },
        { name: 'frodo' },
        { name: 'pippin' },
        { name: 'merry' },
      ]);
    });
};
