import React, { useEffect, useRef } from 'react';
import { SButtonLevel } from '../utils/style';

const SelectLevel = props => {

	const handleClick = e => props.changeLevel( e.target.dataset.diff );

	const baaasicRef = useRef();

	useEffect( () => baaasicRef.current.click(), [] );

	return (
		<div className="btn-group-vertical my-auto me-3" role="group" arial-label="Vertical radio toggle button group">

			<input id="lvl-btn2" className="btn-check" type="radio" name="levelButton"  autoComplete="off" data-diff={2} onClick={handleClick} ref={baaasicRef} />
			<SButtonLevel className="btn btn-lg btn-outline-danger mb-2" htmlFor="lvl-btn2">Baaasic</SButtonLevel>

			<input id="lvl-btn3" className="btn-check" type="radio" name="levelButton"  autoComplete="off" data-diff={3} onClick={handleClick} />
			<SButtonLevel className="btn btn-lg btn-outline-danger mb-2" htmlFor="lvl-btn3">Salty</SButtonLevel>

			<input id="lvl-btn4" className="btn-check" type="radio" name="levelButton"  autoComplete="off" data-diff={4} onClick={handleClick} />
			<SButtonLevel className="btn btn-lg btn-outline-danger mb-2" htmlFor="lvl-btn4">Press F</SButtonLevel>

		</div>

	)
}

export default SelectLevel;