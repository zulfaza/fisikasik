import React from 'react';

const Map = () => {
	return (
		<div className="flex-cc col mt-12 w-full">
			<p className="mb-12 text-3xl font-semibold">Lokasi</p>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24670.84146531149!2d109.87448700669435!3d-7.25228934300856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e700b88f401c273%3A0xf93313399338905!2sGunung%20Bismo!5e0!3m2!1sen!2sid!4v1643081642869!5m2!1sen!2sid"
				width="1000"
				height="450"
				style={{ border: 0 }}
				allowFullScreen={false}
				loading="lazy"
			></iframe>
		</div>
	);
};

export default Map;
