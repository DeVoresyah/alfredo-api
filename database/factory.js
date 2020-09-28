'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    name: faker.name(),
    phone_number: faker.phone(),
    email: faker.email(),
    password: "password"
  }
});

Factory.blueprint('App/Models/Admin', async (faker, i, data) => {
  return {
    username: data.username || `sales${i+1}`,
    name: "Admin " + faker.first(),
    phone_number: faker.phone(),
    email: faker.email(),
    role: data.role || "sales",
    password: data.password || "password"
  }
});

Factory.blueprint('App/Models/Address', (faker) => {
  return {
    address: faker.address(),
    zip_code: faker.postcode(),
    state: faker.state(),
    city: faker.city()
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  const title = faker.sentence({ words: 3 });
  const slug = title.replace(/\s+/g, '-').toLowerCase();

  return {
    title,
    thumbnail: "https://picsum.photos/200/300?product=" + slug,
    desc: faker.paragraph(),
    price: faker.integer({ min: 1, max: 200 }) * 1e3,
    stock: faker.integer({ min: 10, max: 50 }),
    slug
  }
});

Factory.blueprint('App/Models/Category', (faker) => {
  const title = faker.sentence({ words: 1 });
  const slug = title.replace(/\s+/g, '-').toLowerCase();

  return {
    title,
    desc: faker.sentence({ words: 12 }),
    thumbnail: "https://picsum.photos/200/300?category=" + slug,
    slug
  }
});

Factory.blueprint('App/Models/Categories', (faker, i, data) => {
  return {
    category_id: data.category_id,
    product_id: data.product_id
  }
});
