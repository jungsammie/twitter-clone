import React, { useState, useEffect } from 'react';
import { dbService } from 'firebaseConfig';
import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
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
    dbService.collection('tweets').onSnapshot((snapshot) => {
      //realtime update
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div className="mt-30" >
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userObj={userObj}
            isOwner={userObj.uid === tweet.creatorId}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
