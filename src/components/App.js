import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseConfig";

//Handling all the logics
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;
