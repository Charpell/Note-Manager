import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'(text){
    check(text, String);

    // CHECK IF USER IS LOGGED IN
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  'notes.remove'(note){
    check(note._id, String);

    // Check if the the person deleting is the owner
    if(note.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized')
    }
    
    Notes.remove(note._id);
  }
})