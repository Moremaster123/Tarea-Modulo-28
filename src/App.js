import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header';
import Song from './Components/Song';

class App extends Component {

    componentDidMount() {
        console.log('La aplicación se ha cargado correctamente');
    }

    render() {
        return (
            <div className="App">

                <Header />

                <main className="music-library">

                    <h2>Mis canciones</h2>

                    <Song
                        title="Billie Jean"
                        artist="Michael Jackson"
                        album="Thriller"
                        duration="4:54"
                    />

                    <Song
                        title="Bohemian Rhapsody"
                        artist="Queen"
                        album="A Night at the Opera"
                        duration="5:55"
                    />

                    <Song
                        title="Imagine"
                        artist="John Lennon"
                        album="Imagine"
                        duration="3:03"
                    />

                </main>

            </div>
        );
    }
}

export default App;