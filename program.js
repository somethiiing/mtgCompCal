#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');

const { listStores, addEventToCal } = require('./scripts.js');
const { autoCreateEvent, autoDebug } = require('./fb');

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
    message : 'Enter time in HH:MM or HH format: '
  },
  {
    type : 'input',
    name : 'desc',
    message : 'Enter description for event: '
  }
];

const autoAddPrompts = [
  {
    type: 'input',
    name: 'store',
    message: 'Enter store code: '
  },
  {
    type: 'input',
    name: 'eventId',
    message: 'Enter FB Event ID: '
  }
];

program
  .version('0.0.1')
  .description('MTG Competitive Calendar')

program
  .command('manualAdd')
  .alias('manual')
  .description('Manually add an event to MTG Competitive Calendar')
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

program
  .command('autoAdd')
  .alias('auto')
  .description('Enter FB Event ID to add an event to MTG Competitive Calendar')
  .action( () => {
    console.log('Store Code List:');
    listStores();
    prompt(autoAddPrompts)
      .then( answers => autoCreateEvent(answers) );
  });

program
  .command('autoDebug')
  .alias('debug')
  .description('Enter FB Event ID to view FB event data')
  .action( () => {
    console.log('Store Code List:');
    listStores();
    prompt(autoAddPrompts)
      .then( answers => autoDebug(answers) );
  });

program.parse(process.argv);
