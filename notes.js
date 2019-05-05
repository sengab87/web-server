const fs = require("fs");
const chalk = require("chalk");
exports.getNotes = function() {
  return "Your Notes";
};
exports.addNote = function(title,body){
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);
  /*const duplicateNotes = notes.filter(function(note){
    return note.title === title
  });*/
  debugger
  
  if (!duplicateNote){
    notes.push({
      title:title,
      body:body
    });
    saveNotes(notes);
    console.log("New Note added");
  }else {
    console.log("Note title taken");
  }
};
exports.removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title)
  if (notes.length > notesToKeep.length)
  {
    console.log(chalk.green.inverse("Note Removed"));
    saveNotes(notesToKeep);
  }
  else {
    console.log(chalk.red.inverse("No Note Found"));
  }
};
exports.readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"))
  }
};
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json",dataJSON);
};
exports.listNotes = () => {
  console.log(chalk.inverse("Your notes"));
  const notes = loadNotes();
  notes.forEach((note) => { console.log(note.title);
  });
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  }catch(err)
  {
    return [];
  }
};
