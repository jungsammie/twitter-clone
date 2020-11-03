import React, { useState, useEffect } from "react";
import { dbService } from "firebaseConfig";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();
  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection("tweets").get();
  //   dbTweets.forEach(document => {
  //     const tweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets(prev => [document.data(), ...prev])
  //   });
  // };
  useEffect(() => {
    // getTweets();
    dbService.collection("tweets").onSnapshot((snapshot) => { //realtime update
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    const attachedImg = files[0];
    const reader = new FileReader();
    // when reader finish to load file this event is fired
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result }
      } = finishedEvent
      setAttachment(result);
    };
    reader.readAsDataURL(attachedImg);
  }
const onClearPhoto = (event) => setAttachment(null);

  return (
    <div>
      <form>
        <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" onClick={onSubmit} value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" />
            <button onClick={onClearPhoto}>Clear</button>
          </div>)}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={userObj.uid === tweet.creatorId}/>
        ))}
      </div>
    </div>
  );

}
export default Home;