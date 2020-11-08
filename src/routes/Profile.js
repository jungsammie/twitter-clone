import Tweet from 'components/Tweet';
import { authService, dbService } from 'firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  useEffect(() => {
    dbService.collection('tweets').onSnapshot((snapshot) => {
      const tweetArr = snapshot.docs.filter(
        (doc) => doc.data().creatorId === userObj.uid,
      );

      const userTweetArr = tweetArr.map((tweet) => ({
        id: tweet.id,
        ...tweet.data(),
      }));
      setTweets(userTweetArr);
    });
  }, [userObj.uid]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" />
      </form>
      <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Log out
      </span>
      <div className="mt-30">
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
export default Profile;
