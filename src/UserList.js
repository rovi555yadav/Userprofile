import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('pastSearches'));
    if (savedSearches) {
      setPastSearches(savedSearches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  }, [pastSearches]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value && !pastSearches.includes(event.target.value)) {
      setPastSearches([...pastSearches, event.target.value]);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortAscending) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name"
      />
      <button onClick={toggleSortOrder}>
        Sort by name {sortAscending ? '▲' : '▼'}
      </button>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h2>Past Searches</h2>
      <ul>
        {pastSearches.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
