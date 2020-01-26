function weather(){
	var url = 'http://api.weatherstack.com/current?access_key=f2127e80b71e4d2db308f187c3e63a52&query=' + $('#search').val();
	$.getJSON(url, function(data){
		var data = JSON.stringify(data);
		var json = JSON.parse(data);

		var country = json.location.country;
		var city = json.location.name;
		var state = json.location.region;

		var temp = json.current.temperature;
		var temp_f = (temp * 9/5) + 32; 

		var wind = json.current.wind_speed;
		var humidity = json.current.humidity;
		var time = json.location.localtime.split(' ')[1];
		var cloud = json.current.cloudcover;
		$('.grey-jumbo').show();
		$('#weather').html(state + ',' + city + ',' + country);
		if(temp < 15){
			$('.grey-jumbo').css({
				backgroundImage: 'url(https://marketplace.canva.com/MADGyJ61l1w/4/screen_2x/canva-cloudy-sky-MADGyJ61l1w.jpg)',
			});
			$('#temp').html('<h1>Its Pretty Cold Day Today...<hr></h1>');
		}
		else if(temp < 25){
			$('.grey-jumbo').css({
				backgroundImage: 'url(https://images.pond5.com/beautiful-sunset-sky-warm-background-footage-012330594_prevstill.jpeg)',

			});
			$('#temp').html('<h1>Its Warm Day Today...<hr></h1>')
		}
		else{
			$('.grey-jumbo').css({
				backgroundImage: 'url(https://i.ytimg.com/vi/9oJA5HpGazY/maxresdefault.jpg)',

			});
			$('#temp').html('<h1>Its Very Hot Day Today...<hr></h1>');
		}
		$('#switch').show();
		$('#info1').html(time);
		$('#info2').html('Wind:' + wind + ' kmph');
		$('#info3').html(temp + '&#8451');
		$('#info5').html('Humidity: ' + humidity + '%');
		var yes = true;
		$('#switch').on('click',function(){
			if(yes){
				$('#info3').html(temp_f + '&#8457');
				$('#switch').html('Celcius');
				yes =false;
			}
			else
			{
				$('#info3').html(temp + '&#8451');
				$('#switch').html('Farenheight');
				yes =true;
			}
		});
				//showing sky
				if(cloud <= 30)
				{
					$('#info6').html('Clear Sky');
				} else{
					$('#info6').html('Cloud Sky');
				}
				$('#search').on('keydown',function(){
					$('#info1').empty();
					$('#temp').empty();
					$('#info2').empty();
					$('#info3').empty();
					$('.short').hide();
					$('#switch').hide();
					$('.grey-jumbo').hide();
					$('#info5').empty();
					$('#info6').empty();
				});
			});
}
// $(document).ready(function(){
// 	$('.short').hide();
// 	if (navigator.geolocation) {
// 		var currentPosition = '';
// 		navigator.geolocation.getCurrentPosition(function(position){
// 			currentPosition = position;
// 			var latitude = currentPosition.coords.latitude;
// 			var longitude = currentPosition.coords.longitude;
// 			weather();
// 		});
// 	}
// });
$(document).ready(function(){
	$('#search').focus();
	$('#switch').hide();
	$('#search').off('keyup');
	$('#search').on('keyup',function(){
		weather();
	});
});