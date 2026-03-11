function PlayButton({ onClick, text }) {
    return (
        <button className="playButton" onClick={onClick}>{text}</button>
    )
}

export default PlayButton