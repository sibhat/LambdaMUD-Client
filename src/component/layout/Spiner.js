import React from "react";

const Spiner = () => {
	return (
		<div className="cssload-cssload-wrap2">
			<div className="cssload-wrap">
				<div className="cssload-overlay" />

				<div className="cssload-cogWheel cssload-one">
					<div className="cssload-cog cssload-one" />
					<div className="cssload-cog cssload-two" />
					<div className="cssload-cog cssload-three" />
					<div className="cssload-cog cssload-four" />
					<div className="cssload-cog cssload-five" />
					<div className="cssload-center" />
				</div>

				<div className="cssload-cogWheel cssload-two">
					<div className="cssload-cog cssload-one" />
					<div className="cssload-cog cssload-two" />
					<div className="cssload-cog cssload-three" />
					<div className="cssload-cog cssload-four" />
					<div className="cssload-cog cssload-five" />
					<div className="cssload-center" />
				</div>
			</div>
		</div>
	);
};

export default Spiner;
