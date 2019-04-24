
const geocode = require( './utils/geocode' )
const forecast = require( './utils/forecast' )

//console.log( process.argv );

const printWeatherReport = ( err , { currently }  ) => {
	
	var data = currently;
	console.log( data.summary + '. It is currently ' + data.temperature + ' degress out. There is ' +data.precipProbability + '% of rain.' )

}

if ( process.argv.length <= 2 ){
	console.log( 'Please provide search term')
}else{		

	geocode( process.argv[ 2 ] , ( { body } ) =>{
		if( body.features.length === 0 ){
			console.log( "Location not found" );
		}else{
			var { features } 	= body; 
			features 			= features[0];
			var lattitude 		= features.center[ 0 ],
				longnitude = features.center[ 1 ];

			console.log( 'Place name : ' + features.place_name );
			console.log( 'Lattitude : ' + lattitude + ', Lognitude : ' + longnitude );
			
			forecast(longnitude, lattitude, (error, data) => {
		  		//console.log('Error', error)
		  		//console.log('Data', data)
		  		printWeatherReport( error , data )
			})
		}
	});
}
 