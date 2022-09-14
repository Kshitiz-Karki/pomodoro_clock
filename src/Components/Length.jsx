

function Length(props) {
    return (
        <div>            
            <h3>{props.title}</h3>
            <div className="time-sets">
                <button 
                    className="btn-small deep-purple lighten-2"
                    onClick={() => props.changeTime(-60, props.type )}    
                >
                        <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{props.formatTime(props.time)}</h3>
                <button 
                    className="btn-small deep-purple lighten-2"
                    onClick={() => props.changeTime(60, props.type )}
                >
                    <i className="material-icons">arrow_upward</i>
                </button>

            </div>
        </div>
    )
}

export default Length