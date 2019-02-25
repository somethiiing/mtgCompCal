#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');

const { listStores, addEventToCal } = require('./scripts.js');

const addEventToCalPrompts = [
  {
    type : 'input',
    name : 'store',
    message : 'Enter store code: '
  },
  {
    type : 'input',
    name : 'eventName',
    message : 'Enter event name: '
  },
  {
    type : 'input',
    name : 'date',
    message : 'Enter date in MM/DD/YYYY format: '
  },
  {
    type : 'input',
    name : 'time',
    message : 'Enter time in HH:MM format: '
  },
  {
    type : 'input',
    name : 'desc',
    message : 'Enter description for event: '
  }
];

program
  .version('0.0.1')
  .description('MTG Competitive Calendar')

program
  .command('addEventToCal')
  .alias('add')
  .description('Add an event to MTG Competitive Calendar')
  .action( () => {
    console.log('Store Code List:');
    listStores();
    prompt(addEventToCalPrompts)
      .then( answers => addEventToCal(answers) );
  });

program
  .command('listStores')
  .alias('list')
  .description('List stores in MTG Comp Cal database')
  .action( () => listStores() );

program.parse(process.argv);
