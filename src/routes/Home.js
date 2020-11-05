import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'firebaseConfig';
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
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={userObj.uid === tweet.creatorId}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
