import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

// Account config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

import './main.html';


Template.body.helpers({

  // Get all notes
  notes(){
    return Notes.find({})
  }
});


Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();
    
    // Get Input Value
    const target = event.target;
    const text = target.text.value;

    // Insert note into collections
    Meteor.call('notes.insert', text);

    // Clear form
    target.text.value = '';

    // Close modal
    $('#addModal').modal('close');

    return false
  }
})


Template.note.events({
  'click .delete-note': function(){

    // Deletes the note
    Meteor.call('notes.remove', this)

    return false;
  }
})