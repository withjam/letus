import React, { createContext, useEffect, useState } from 'react';
import { LETUS_API_URL } from '@env';

export const AppContext = createContext({});

function mapRecords(jsonData) {
  const records = jsonData.records
    ? jsonData.records.map((record) => {
        const { _header, _values } = record;
        const mapped = _header.map((header, index) => [header, _values[index]]);
        return mapped.reduce((mapped, header) => {
          mapped[header[0]] = header[1];
          return mapped;
        }, {});
      })
    : [];
  return records;
}

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(LETUS_API_URL + '/GetPosts?as=' + user)
        .then((resp) => resp.json())
        .then((json) => setPosts(mapRecords(json)))
        .catch((ex) => console.error(ex));
    }
  }, [user]);
  return (
    <AppContext.Provider value={{ loaded, setLoaded, user, setUser, posts }}>
      {children}
    </AppContext.Provider>
  );
};
