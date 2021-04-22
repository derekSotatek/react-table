import React from 'react';

function MoveCustom(props) {
    return (
        <div>
            <button ref={dragRef}>
              move
            </button>
            <button onClick={() => moveRowUp(index)}>
              up
            </button>
            <button onClick={() => moveRowDown(index)}>
              down
            </button>
        </div>
    );
}

export default MoveCustom;