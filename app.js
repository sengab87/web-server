
const notes = require("./notes.js");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");

console.log(notes.getNotes());
yargs.version("1.1.0");
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title:{
      describe: "Note title perfect",
      demandOption:true,
      type:"string"
    },
    body:{
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
     notes.addNote(argv.title,argv.body);
  }
});

yargs.command({
  command:"remove",
  describe: "remove a note",
  builder:{
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv){
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command:"list",
  describe:"list your notes",
  handler: function(){
    console.log("list notes");
  }
});

yargs.command({
  command:"read",
  describe:"Read a note",
  builder:{
    title: {
      describe: "Note",
      demandOption: true
    }
  },
  handler: function(argv){
    notes.readNote(argv.title);
  }
});
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
    console.log("listing your notes");
  }
});
yargs.parse();
