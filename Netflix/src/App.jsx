import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./context/languages";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  const [language, setLanguage] = useState("en");
  return (
    <Provider store={store}>
      <LanguageProvider value={{ language, setLanguage }}>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  );
}

export default App;
