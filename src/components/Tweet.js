import { dbService } from "firebaseConfig";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  console.log(tweetObj.text);
  const [editing, setEditing] = useState(false); // checking editing mode or not
  const [newTweet, setNewTweet] = useState(tweetObj.text); // for updating text
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if(ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div>
      {
        editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your tweet!" value={newTweet} onChange={onChange} required/>
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" />}
          {isOwner && (
            <>
            <button onClick={onDeleteClick}>Delete</button>
            <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>)
      }
    </div>
  );
};

export default Tweet;