import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const expenseCategories = [
  'Groceries',
  'Transport',
  'Housing',
  'Entertainment',
  'Restaurant',
  'Health',
  'Education',
  'Utilities',
  'Other',
];

const incomeCategories = [
  'Salary/Wages',
  'Pension',
  'Investment',
  'Editing',
  'Rental',
  'Social Benefits',
  'Other',
];

const investmentCategories = [
  'Stocks',
  'Dividends',
  'Interest',
  'Propery',
  'Capital Gains',
  'Other',
];

const savingsCategories = [
  'Emergency',
  'Retirement',
  'Special Purpose',
  'Other',
];

async function seedUsers() {
  for (let i = 0; i < 5; i++) {
    try {
      const { error } = await supabase.auth.admin.createUser({
        email: faker.internet.email(),
        password: 'password',
      });

      if (error) {
        throw new Error(error);
      }

      console.log(`User added`);
    } catch (e) {
      console.error(`Error adding user`);
    }
  }
}

async function seed() {
  await seedUsers();
  let transactions = [];
  const {
    data: { users },
    error: listUsersError,
  } = await supabase.auth.admin.listUsers();

  if (listUsersError) {
    console.error(`Cannot list users, aborting`);
    return;
  }

  const userIds = users?.map(user => user.id);

  for (let i = 0; i < 100; i++) {
    const created_at = faker.date.past();
    let type,
      category = null;
    const user_id = faker.helpers.arrayElement(userIds);
    const typeBias = Math.random();

    if (typeBias < 0.5) {
      type = 'Expenses';
      category = faker.helpers.arrayElement(expenseCategories);
    } else if (typeBias < 0.7) {
      type = 'Income';
      category = faker.helpers.arrayElement(incomeCategories);
    } else if (typeBias < 0.9) {
      type = 'Investment';
      category = faker.helpers.arrayElement(investmentCategories);
    } else {
      type = 'Savings';
      category = faker.helpers.arrayElement(savingsCategories);
    }

    let amount;
    switch (type) {
      case 'Income':
        amount = faker.number.int({
          min: 10_000,
          max: 20_000,
        });
        break;
      case 'Expenses':
        amount = faker.number.int({
          min: 50,
          max: 5000,
        });
        break;
      case 'Investment':
        amount = faker.number.int({
          min: 5000,
          max: 10_000,
        });
        break;
      case 'Savings':
        amount = faker.number.int({
          min: 3000,
          max: 8_000,
        });
        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
      user_id,
    });
  }

  const { error } = await supabase.from('transactions').insert(transactions);

  if (error) {
    console.error('Error inserting data');
  } else {
    console.log(`${transactions.length} transactions stored`);
  }
}

seed().catch(console.error);
