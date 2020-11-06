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
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
    const tweetArr = tweets.docs.map((doc) => doc.data());
    setTweets(tweetArr);
  };

  useEffect(() => {
    getMyTweets();
  });

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
    </div>
  );
};
export default Profile;
