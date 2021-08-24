import React, { useEffect, useState } from "react";
import db from "../firebase.js";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

const Main = () => {
  
  const [subjectList, setSubjectList] = useState({});
  const [topicList, setTopicList] = useState({});
  const [noteList, setNoteList] = useState({});

  const [addSubjectText, setAddSubjectText] = useState("");
  const [addTopicText, setAddTopicText] = useState("");
  const [addNoteText, setAddNoteText] = useState("");

  const [currentSubId, setCurrentSubId] = useState("");
  const [currentTopicId, setCurrentTopicId] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState("");

  const [showAddTopicsMenu, setShowAddTopicsMenu] = useState(false);
  const [showAddNotesMenu, setShowAddNotesMenu] = useState(false);

  const [showEditSubjectMenu, setShowEditSubjectMenu] = useState(false);
  const [showEditTopicMenu, setShowEditTopicMenu] = useState(false);
  const [showEditNoteMenu, setShowEditNoteMenu] = useState(false);

  const [editSubjectText, setEditSubjectText] = useState("");
  const [editTopicText, setEditTopicText] = useState("");
  const [editNoteText, setEditNoteText] = useState("");

  // get subjects data when the page loads, and store it in subjectList object {document_id: document_field_name}.
  useEffect(() => {
    db.collection("Subject").onSnapshot((querySnapshot) => {
      var arr = {};
      querySnapshot.forEach((doc) => {
        arr[doc.id] = doc.data().name;
      });
      setSubjectList(arr);
    });
  }, []);

  // adds a new document (with auto generated id) to the "Subject" collection.
  const handleAddSubject = () => {
    db.collection("Subject")
      .add({
        name: `${addSubjectText}`,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    setAddSubjectText("");
  };

  // adds a new document (with auto generated id) to the "Topics" collection.
  const handleAddTopic = () => {
    db.collection("Subject")
      .doc(`${currentSubId}`)
      .collection("Topics")
      .add({
        name: `${addTopicText}`,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    setAddTopicText("");
  };

  // adds a new document (with auto generated id) to the "Notes" collection.
  const handleAddNote = (e) => {
    db.collection("Subject")
      .doc(`${e.sub}`)
      .collection("Topics")
      .doc(`${e.topic}`)
      .collection("Notes")
      .add({
        name: `${addNoteText}`,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    setAddNoteText("");
  };

  // get topics data when the "Topics" button is clicked, and store it in topicList object {document_id: document_field_name}.
  const handleTopicClick = (e) => {
    const subRef = e.sub;
    setCurrentSubId(subRef);

    db.collection("Subject")
      .doc(subRef)
      .collection("Topics")
      .onSnapshot((querySnapshot) => {
        var arr = {};
        querySnapshot.forEach((doc) => {
          arr[doc.id] = doc.data().name;
        });
        setTopicList(arr);
      });
  };

  // get notes data when the "Notes" button is clicked, and store it in noteList object {document_id: document_field_name}.
  const handleNoteClick = (e) => {
    const topicRef = e.topic;
    const subRef = e.sub;
    setCurrentTopicId(topicRef);
    setCurrentSubId(subRef);

    db.collection("Subject")
      .doc(subRef)
      .collection("Topics")
      .doc(topicRef)
      .collection("Notes")
      .onSnapshot((querySnapshot) => {
        let arr = {};
        querySnapshot.forEach((doc) => {
          arr[doc.id] = doc.data().name;
        });
        setNoteList(arr);
      });
  };

  // helper to set the current subject document id.
  const handleSubjectEditClick = (e) => {
    setCurrentSubId(e.sub);
  };

  // helper to set the current topic document id.
  const handleTopicEditClick = (e) => {
    setCurrentTopicId(e.topic);
  };

  // helper to set the current note document id.
  const handleNoteEditClick = (e) => {
    setCurrentNoteId(e.note);
  };

  // helper to set the current note document id.
  const handleNoteDeleteClick = (e) => {
    setCurrentNoteId(e.note);
  };

  // helper to set the current topic document id.
  const handleTopicDeleteClick = (e) => {
    setCurrentTopicId(e.topic);
  };

  const handleEditSubject = () => {
    db.collection("Subject")
      .doc(`${currentSubId}`)
      .update({
        name: `${editSubjectText}`,
      })
      .then(() => {
        console.log("Document successfully edited!");
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
      });

    setShowEditSubjectMenu(false);
    setEditSubjectText("");
  };

  const handleEditTopic = () => {
    db.collection("Subject")
      .doc(`${currentSubId}`)
      .collection("Topics")
      .doc(`${currentTopicId}`)
      .update({
        name: `${editTopicText}`,
      })
      .then(() => {
        console.log("Document successfully edited!");
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
      });

    setShowEditTopicMenu(false);
    setEditTopicText("");
  };

  const handleEditNote = () => {
    db.collection("Subject")
      .doc(`${currentSubId}`)
      .collection("Topics")
      .doc(`${currentTopicId}`)
      .collection("Notes")
      .doc(`${currentNoteId}`)
      .update({
        name: `${editNoteText}`,
      })
      .then(() => {
        console.log("Document successfully edited!");
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
      });

    setShowEditNoteMenu(false);
    setEditNoteText("");
  };

  const handleDeleteSubject = (e) => {
    db.collection("Subject")
      .doc(`${e.sub}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  };

  const handleDeleteTopic = (e) => {
    db.collection("Subject")
      .doc(`${currentSubId}`)
      .collection("Topics")
      .doc(`${e.topic}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  };

  const handleDeleteNote = (e) => {
    db.collection("Subject")
      .doc(`${currentSubId}`)
      .collection("Topics")
      .doc(`${e.topic}`)
      .collection("Notes")
      .doc(`${e.note}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  };

  return (
    <div>
      <div className="sub">
        <h2>Subjects</h2>
        <TextField
          id="outlined-basic"
          label="Add subject"
          variant="outlined"
          onChange={(e) => setAddSubjectText(e.target.value)}
          value={addSubjectText}
        />
        <IconButton
          aria-label="add"
          onClick={handleAddSubject}
          disabled={!addSubjectText}
        >
          <AddCircleIcon fontSize="large" color="primary" />
        </IconButton>
      </div>

      {Object.keys(subjectList).map((sub) => (
        <div>
          <Card>
            <CardContent>
              <ListItem>
                <Typography variant="h5">{subjectList[sub]}</Typography>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => {
                    handleDeleteSubject({ sub });
                  }}
                >
                  <DeleteIcon />
                </IconButton>

                {showEditSubjectMenu && sub === currentSubId && (
                  <div>
                    <div></div>
                    <TextField
                      label="Edit subject"
                      variant="outlined"
                      onChange={(e) => setEditSubjectText(e.target.value)}
                      value={editSubjectText}
                    />
                    <IconButton
                      aria-label="add"
                      onClick={handleEditSubject}
                      disabled={!editSubjectText}
                    >
                      <SaveIcon color="primary" />
                    </IconButton>{" "}
                  </div>
                )}
                {!showEditSubjectMenu && (
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => {
                      setShowEditSubjectMenu(true);
                      handleSubjectEditClick({ sub });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </ListItem>
            </CardContent>
            <CardActions>
              <div className="topics">
                <Chip
                  label="Topics"
                  onClick={() => {
                    handleTopicClick({ sub });
                    setShowAddTopicsMenu(true);
                    setShowEditSubjectMenu(false);
                    setShowAddNotesMenu(false);
                  }}
                  color="primary"
                  variant="outlined"
                />

                {showAddTopicsMenu && sub === currentSubId && (
                  <div className="topic__menu">
                    <TextField
                      label="Add topic"
                      variant="outlined"
                      onChange={(e) => setAddTopicText(e.target.value)}
                      value={addTopicText}
                    />
                    <IconButton
                      aria-label="add"
                      onClick={handleAddTopic}
                      disabled={!addTopicText}
                    >
                      <AddCircleIcon color="primary" />
                    </IconButton>
                  </div>
                )}
              </div>
            </CardActions>

            {sub === currentSubId ? (
              Object.keys(topicList).map((topic) => (
                <div>
                  <Card>
                    <CardContent>
                      <ul>
                        <li>{topicList[topic]}</li>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => {
                            handleTopicDeleteClick({ topic });
                            handleDeleteTopic({ topic });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        {showEditTopicMenu && topic === currentTopicId && (
                          <div>
                            <TextField
                              label="Edit topic"
                              variant="outlined"
                              onChange={(e) => setEditTopicText(e.target.value)}
                              value={editTopicText}
                            />
                            <IconButton
                              aria-label="edit"
                              onClick={handleEditTopic}
                              disabled={!editTopicText}
                            >
                              <SaveIcon color="primary" />
                            </IconButton>{" "}
                          </div>
                        )}
                        {!showEditSubjectMenu && (
                          <IconButton
                            aria-label="edit"
                            color="primary"
                            onClick={() => {
                              setShowEditTopicMenu(true);
                              handleTopicEditClick({ topic });
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <ul className="notes__chip">
                        <Chip
                          label="Notes"
                          onClick={() => {
                            handleNoteClick({ topic, sub });
                            setShowAddNotesMenu(true);
                          }}
                          variant="outlined"
                          color="primary"
                        />

                        {showAddNotesMenu &&
                          sub === currentSubId &&
                          topic === currentTopicId && (
                            <div className="note__menu">
                              <TextField
                                label="Add note"
                                variant="outlined"
                                onChange={(e) => setAddNoteText(e.target.value)}
                                value={addNoteText}
                              />
                              <IconButton
                                aria-label="add"
                                color="primary"
                                onClick={() => {
                                  handleAddNote({ sub, topic });
                                }}
                                disabled={!addNoteText}
                              >
                                <AddCircleIcon />
                              </IconButton>
                            </div>
                          )}
                      </ul>
                    </CardActions>

                    {topic === currentTopicId &&
                    showAddNotesMenu &&
                    sub === currentSubId ? (
                      Object.keys(noteList).map((note) => (
                        <div className="notes">
                          <List
                            component="nav"
                            aria-label="main mailbox folders"
                          >
                            <ListItem>
                              <ListItemText primary={noteList[note]} />
                              <IconButton
                                aria-label="delete"
                                color="primary"
                                onClick={() => {
                                  handleNoteDeleteClick({ note });
                                  handleDeleteNote({ topic, note });
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                              {showEditNoteMenu && note === currentNoteId && (
                                <div>
                                  <TextField
                                    label="Edit note"
                                    variant="outlined"
                                    onChange={(e) =>
                                      setEditNoteText(e.target.value)
                                    }
                                    value={editNoteText}
                                  />
                                  <IconButton
                                    aria-label="edit"
                                    onClick={handleEditNote}
                                    disabled={!editNoteText}
                                  >
                                    <SaveIcon color="primary" />
                                  </IconButton>{" "}
                                </div>
                              )}
                              {!showEditNoteMenu && (
                                <IconButton
                                  aria-label="edit"
                                  color="primary"
                                  onClick={() => {
                                    setShowEditNoteMenu(true);
                                    handleNoteEditClick({ note });
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              )}
                            </ListItem>
                          </List>
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </Card>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Main;
