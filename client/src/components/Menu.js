import React from 'react';
export const Menu = ({ setVisibility, visibility }) => {

    const color = { color: '#BDBDBD' };

    const showFavorites = () => {
        console.log(visibility);
        setVisibility({
            highlight: false,
            booklist: false,
            favorites: true

        });

    }

    const showHome = () => {
        setVisibility({
            highlight: false,
            booklist: true,
            favorites: false
        });

    }

    return (
        <nav aria-label="App navigation" id="app-nav">
            <span>
                {visibility.favorites ?
                    <button style={color}>Go To Home</button> :
                    <button onClick={() => showFavorites()}>Go To Favourites</button>
                }
            </span>
            <span>
                {visibility.favorites ?
                    <button onClick={() => showHome()}>Go To Home</button> :
                    <button style={color}>Go To Home</button>
                }
            </span>
            <span>
                <a href="https://github.com/Shahriar87/Book-ish"><button>GitHub</button>
                </a>
            </span>
        </nav>
    )
}