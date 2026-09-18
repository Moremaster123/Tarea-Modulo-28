import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import SearchResults from './Components/SearchResults';
import Library from './Components/Library';
import './App.css';

function App() {
    const [searchResults] = useState([
        {
            id: 1,
            title: 'Billie Jean',
            artist: 'Michael Jackson',
            album: 'Thriller',
            duration: '4:54'
        },
        {
            id: 2,
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
            duration: '5:55'
        },
        {
            id: 3,
            title: 'Imagine',
            artist: 'John Lennon',
            album: 'Imagine',
            duration: '3:07'
        }
    ]);

    const [library, setLibrary] = useState([]);

    const addToLibrary = (song) => {
        setLibrary(prev => [...prev, song]);
    };

    useEffect(() => {
        console.log('La biblioteca se actualizó:', library);
    }, [library]);

    return (
        <div className="App">
            <Header />

            <SearchResults 
                songs={searchResults} 
                onAddToLibrary={addToLibrary}
            />

            <Library songs={library} />
        </div>
    );
}

export default App;