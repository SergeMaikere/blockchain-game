import React from 'react';
import { SButton, SCard } from '../utils/style';

const CallToAction = props => {

	return (
		<SCard className="card border-light text-center">
			<img className="img-fluid" src="/images/big-brain.png" alt="pixel art brain-chtulhu" />
			<div className="card-body">
				<h5 className="card-title">Lorem Ipsum</h5>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
				Numquam ea iusto explicabo accusantium qui architecto aspernatur 
				veniam ducimus quo voluptatibus, minima quaerat repudiandae, dolores 
				fuga id similique suscipit eum dolorum.</p>
				<SButton className="btn btn-lg" type="button">START</SButton>
			</div>
		</SCard>
	)
}

export default CallToAction;