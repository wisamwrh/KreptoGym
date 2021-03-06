/* eslint-disable no-undef */
$(document).ready(async () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	const socket = io();


	/*GET Coach data */
	const clientData = await fetch('/coachs/client/' + id, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body data type must match "Content-Type" header
	});

	if (clientData.status === 200) {
		clientData.json().then((client) => {
			if(client.profilePic != undefined){
				$('#image').attr('src', `data:image/png;base64,${client.profilePic}`);
			}
			else{
				$('#image').attr('src', '/images/default-pp.png');
			}
			$('#age').text(diff_years(`${client.birthDate}`));
			$('#height').text(`${client.height}`);
			$('#weight').text(`${client.weight}`);
		});
	}

	let clientTrainSched = await fetch('/coachs/client/trainingSchedule/' + id, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	if (clientTrainSched.status === 200) {
		clientTrainSched.json().then((data) => {
			Object.keys(data).forEach(key => {
				if (data[key].Muscle.length !== 0) {
					data[key].Muscle.forEach(element => {
						$(`#${key}-exercises-div`).append(addExerciseHTML(element, 'Muscle', key));
					});
				}
				if (data[key].Cardio.length !== 0) {
					data[key].Cardio.forEach(element => {
						$(`#${key}-exercises-div`).append(addCardioHTML(element, 'Cardio', key));
					});
				}
				if (data[key].Stretches.length !== 0) {
					data[key].Stretches.forEach(element => {
						$(`#${key}-exercises-div`).append(addStretchesHTML(element, 'Stretches', key));
					});
				}
			});
		});
	}

	$('#sunday-open-icon').click(async () => {
		if ($('#sunday-open-icon').hasClass('fa-caret-down')) {
			$('#sunday-exercises-div').css('height', '300px');
			$('#sunday-exercises-div').css('opacity', '1');
			$('#sunday-open-icon').removeClass('fa-caret-down');
			$('#sunday-open-icon').addClass('fa-caret-up');
			$('#sunday').addClass('fa-plus');
			$('#sunday').css('display', 'flex');
		} else {
			$('#sunday-exercises-div').css('height', '0');
			$('#sunday-exercises-div').css('opacity', '0');
			$('#sunday-open-icon').removeClass('fa-caret-up');
			$('#sunday-open-icon').addClass('fa-caret-down');
			$('#sunday').css('display', 'none');
			$('#sunday').removeClass('fa-plus');
		}
	});
	$('#monday-open-icon').click(async () => {
		if ($('#monday-open-icon').hasClass('fa-caret-down')) {
			$('#monday-exercises-div').css('height', '300px');
			$('#monday-open-icon').removeClass('fa-caret-down');
			$('#monday-open-icon').addClass('fa-caret-up');
			$('#monday').addClass('fa-plus');
			$('#monday').css('display', 'flex');
		} else {
			$('#monday-exercises-div').css('height', '0');
			$('#monday-open-icon').removeClass('fa-caret-up');
			$('#monday-open-icon').addClass('fa-caret-down');
			$('#monday').css('display', 'none');
			$('#monday').removeClass('fa-plus');
		}
	});
	$('#tuesday-open-icon').click(async () => {
		if ($('#tuesday-open-icon').hasClass('fa-caret-down')) {
			$('#tuesday-exercises-div').css('height', '300px');
			$('#tuesday-open-icon').removeClass('fa-caret-down');
			$('#tuesday-open-icon').addClass('fa-caret-up');
			$('#tuesday').addClass('fa-plus');
			$('#tuesday').css('display', 'flex');
		} else {
			$('#tuesday-exercises-div').css('height', '0');
			$('#tuesday-open-icon').removeClass('fa-caret-up');
			$('#tuesday-open-icon').addClass('fa-caret-down');
			$('#tuesday').css('display', 'none');
			$('#tuesday').removeClass('fa-plus');
		}
	});
	$('#wednesday-open-icon').click(async () => {
		if ($('#wednesday-open-icon').hasClass('fa-caret-down')) {
			$('#wednesday-exercises-div').css('height', '300px');
			$('#wednesday-open-icon').removeClass('fa-caret-down');
			$('#wednesday-open-icon').addClass('fa-caret-up');
			$('#wednesday').addClass('fa-plus');
			$('#wednesday').css('display', 'flex');
		} else {
			$('#wednesday-exercises-div').css('height', '0');
			$('#wednesday-open-icon').removeClass('fa-caret-up');
			$('#wednesday-open-icon').addClass('fa-caret-down');
			$('#wednesday').css('display', 'none');
			$('#wednesday').removeClass('fa-plus');
		}
	});
	$('#thursday-open-icon').click(async () => {
		if ($('#thursday-open-icon').hasClass('fa-caret-down')) {
			$('#thursday-exercises-div').css('height', '300px');
			$('#thursday-open-icon').removeClass('fa-caret-down');
			$('#thursday-open-icon').addClass('fa-caret-up');
			$('#thursday').addClass('fa-plus');
			$('#thursday').css('display', 'flex');
		} else {
			$('#thursday-exercises-div').css('height', '0');
			$('#thursday-open-icon').removeClass('fa-caret-up');
			$('#thursday-open-icon').addClass('fa-caret-down');
			$('#thursday').css('display', 'none');
			$('#thursday').removeClass('fa-plus');
		}
	});
	$('#friday-open-icon').click(async () => {
		if ($('#friday-open-icon').hasClass('fa-caret-down')) {
			$('#friday-exercises-div').css('height', '300px');
			$('#friday-open-icon').removeClass('fa-caret-down');
			$('#friday-open-icon').addClass('fa-caret-up');
			$('#friday').addClass('fa-plus');
			$('#friday').css('display', 'flex');
		} else {
			$('#friday-exercises-div').css('height', '0');
			$('#friday-open-icon').removeClass('fa-caret-up');
			$('#friday-open-icon').addClass('fa-caret-down');
			$('#friday').css('display', 'none');
			$('#friday').removeClass('fa-plus');
		}
	});
	$('#saturday-open-icon').click(async () => {
		if ($('#saturday-open-icon').hasClass('fa-caret-down')) {
			$('#saturday-exercises-div').css('height', '300px');
			$('#saturday-open-icon').removeClass('fa-caret-down');
			$('#saturday-open-icon').addClass('fa-caret-up');
			$('#saturday').addClass('fa-plus');
			$('#saturday').css('display', 'flex');
		} else {
			$('#saturday-exercises-div').css('height', '0');
			$('#saturday-open-icon').removeClass('fa-caret-up');
			$('#saturday-open-icon').addClass('fa-caret-down');
			$('#saturday').css('display', 'none');
			$('#saturday').removeClass('fa-plus');
		}
	});

	$('#add-exercise-popup-close').on('click', function () {
		clearAddPopupFields();
	});

	$('#muscle-building-choice-btn').on('click', function () {
		if ($('#cardio-exercise-div').css('display') == 'flex') {
			$('#cardio-exercise-div-inner').css('width', '50%');
			$('#cardio-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left', '0');
			setTimeout(() => {
				$('#cardio-exercise-div').css('display', 'none');
				$('#muscle-building-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#muscle-building-exercise-div-inner').css('width', '80%');
				$('#muscle-building-exercise-div-inner').css('opacity', '1');
			}, 250);
		} else if ($('#other-exercises-div').css('display') == 'flex') {
			$('#other-exercises-div-inner').css('width', '50%');
			$('#other-exercises-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left', '0');
			setTimeout(() => {
				$('#other-exercises-div').css('display', 'none');
				$('#muscle-building-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#muscle-building-exercise-div-inner').css('width', '80%');
				$('#muscle-building-exercise-div-inner').css('opacity', '1');
			}, 250);
		}
	});

	$('#cardio-choice-btn').on('click', function () {
		if ($('#muscle-building-exercise-div').css('display') == 'flex') {
			$('#muscle-building-exercise-div-inner').css('width', '50%');
			$('#muscle-building-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left', '33.333%');
			setTimeout(() => {
				$('#muscle-building-exercise-div').css('display', 'none');
				$('#cardio-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#cardio-exercise-div-inner').css('width', '80%');
				$('#cardio-exercise-div-inner').css('opacity', '1');
			}, 250);
		} else if ($('#other-exercises-div').css('display') == 'flex') {
			$('#other-exercises-div-inner').css('width', '50%');
			$('#other-exercises-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left', '33.333%');
			setTimeout(() => {
				$('#other-exercises-div').css('display', 'none');
				$('#cardio-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#cardio-exercise-div-inner').css('width', '80%');
				$('#cardio-exercise-div-inner').css('opacity', '1');
			}, 250);
		}
	});

	$('#other-choice-btn').on('click', function () {
		if ($('#muscle-building-exercise-div').css('display') == 'flex') {
			$('#muscle-building-exercise-div-inner').css('width', '50%');
			$('#muscle-building-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left', '66.666%');
			setTimeout(() => {
				$('#muscle-building-exercise-div').css('display', 'none');
				$('#other-exercises-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#other-exercises-div-inner').css('width', '80%');
				$('#other-exercises-div-inner').css('opacity', '1');
			}, 250);
		} else if ($('#cardio-exercise-div').css('display') == 'flex') {
			$('#cardio-exercise-div-inner').css('width', '50%');
			$('#cardio-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left', '66.666%');
			setTimeout(() => {
				$('#cardio-exercise-div').css('display', 'none');
				$('#other-exercises-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#other-exercises-div-inner').css('width', '80%');
				$('#other-exercises-div-inner').css('opacity', '1');
			}, 250);
		}
	});

	let day = '';
	let Exercise_name = '';
	let Number_of_reps = 0;
	let Recommended_weight = 0;
	let Description = '';
	let Exercise_time_in_minutes = 0;
	$('.CSU-day-add-exercise-icon').on('click', async (event) => {
		$('.CSU-add-exercise-popup-confirm-button').attr('id', 'add-exercise-popup-btn');
		day = event.target.id;
		$('#add-exercise-popup').addClass('is-visible');
	});

	let muscleREQ;
	let cardioREQ;
	let otherREQ;
	// 
	$(document).on('click', 'button#add-exercise-popup-btn', async () => {
		if ($('#muscle-building-exercise-div').css('display') == 'flex') {
			Exercise_name = $('#muscleExerciseName').val();
			Number_of_reps = $('#numberOfsets').val();
			Recommended_weight = $('#RecommendedWeight').val();
			Description = $('#muscleDes').val();
			if (Exercise_name != '' && Number_of_reps != '' && Recommended_weight != '' && Description != '') {
				muscleREQ = await fetch('/coachs/client/trainingSchedule/' + id, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						day,
						'type': 'Muscle',
						data: {
							Exercise_name,
							Number_of_reps,
							Recommended_weight,
							Description
						}
					})
				});
				if (muscleREQ.status === 200) {
					//Send refresh page to client
					socket.emit('refreshPage', id);
					muscleREQ.json().then(async (data) => {
						$(`#${day}-exercises-div`).append(addExerciseHTML(data, 'Muscle', day));
					});
					$('#add-exercise-popup').removeClass('is-visible');

				}
			}
		} else if ($('#cardio-exercise-div').css('display') == 'flex') {
			Exercise_name = $('#cardioExerciseName').val();
			Exercise_time_in_minutes = $('#cardioTime').val();
			Description = $('#cardioDes').val();
			if (Exercise_name != '' && Exercise_time_in_minutes != '' && Description != '') {
				cardioREQ = await fetch('/coachs/client/trainingSchedule/' + id, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						day,
						'type': 'Cardio',
						data: {
							Exercise_name,
							Exercise_time_in_minutes,
							Description
						}
					})
				});
				if (cardioREQ.status === 200) {
					socket.emit('refreshPage', id);
					cardioREQ.json().then(async (data) => {
						$(`#${day}-exercises-div`).append(addCardioHTML(data, 'Cardio', day));
					});
					$('#add-exercise-popup').removeClass('is-visible');
				}
			}
		} else {
			Exercise_name = $('#stretchesExerciseName').val();
			Description = $('#stretchesDes').val();
			if (Exercise_name != '' && Description != '') {
				otherREQ = await fetch('/coachs/client/trainingSchedule/' + id, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						day,
						'type': 'Stretches',
						data: {
							Exercise_name,
							Description
						}
					})
				});
				if (otherREQ.status === 200) {
					socket.emit('refreshPage', id);
					otherREQ.json().then(async (data) => {
						$(`#${day}-exercises-div`).append(addStretchesHTML(data, 'Stretches', day));
					});
					$('#add-exercise-popup').removeClass('is-visible');
				}
			}
		}
		clearAddPopupFields();
	});

	let exID = '';
	let exType = '';
	let exDay = '';
	let getEx = '';
	//***************************        Update Exercise          *********************************
	$(document).on('click', 'i.CSU-exercise-edit-btn-icon', async (e) => {
		$('.CSU-add-exercise-popup-confirm-button').attr('id', 'edit-exercise-popup-btn');
		exID = e.target.getAttribute('id');
		exType = e.target.getAttribute('name');
		exDay = e.target.getAttribute('value');
		// GET data of the clicked Exercise to update
		getEx = await fetch(`/coachs/client/exercise/${id}/${exID}/${exType}/${exDay}`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (getEx.status === 200) {
			$('#add-exercise-popup').addClass('is-visible');
			getEx.json().then((data) => {
				switch (exType) {
				case 'Muscle':
					$('#muscleExerciseName').val(data.Exercise_name);
					$('#numberOfsets').val(data.Number_of_reps);
					$('#RecommendedWeight').val(data.Recommended_weight);
					$('#muscleDes').val(data.Description);
					if ($('#cardio-exercise-div').css('display') == 'flex') {
						$('#cardio-exercise-div-inner').css('width', '50%');
						$('#cardio-exercise-div-inner').css('opacity', '0');
						$('.CSU-add-exercise-buttons-border').css('left', '0');
						setTimeout(() => {
							$('#cardio-exercise-div').css('display', 'none');
							$('#muscle-building-exercise-div').css('display', 'flex');
						}, 200);
						setTimeout(() => {
							$('#muscle-building-exercise-div-inner').css('width', '80%');
							$('#muscle-building-exercise-div-inner').css('opacity', '1');
						}, 250);
					} else if ($('#other-exercises-div').css('display') == 'flex') {
						$('#other-exercises-div-inner').css('width', '50%');
						$('#other-exercises-div-inner').css('opacity', '0');
						$('.CSU-add-exercise-buttons-border').css('left', '0');
						setTimeout(() => {
							$('#other-exercises-div').css('display', 'none');
							$('#muscle-building-exercise-div').css('display', 'flex');
						}, 200);
						setTimeout(() => {
							$('#muscle-building-exercise-div-inner').css('width', '80%');
							$('#muscle-building-exercise-div-inner').css('opacity', '1');
						}, 250);
					}
					break;
				case 'Stretches':
					$('#stretchesExerciseName').val(data.Exercise_name);
					$('#stretchesDes').val(data.Description);
					if ($('#muscle-building-exercise-div').css('display') == 'flex') {
						$('#muscle-building-exercise-div-inner').css('width', '50%');
						$('#muscle-building-exercise-div-inner').css('opacity', '0');
						$('.CSU-add-exercise-buttons-border').css('left', '66.666%');
						setTimeout(() => {
							$('#muscle-building-exercise-div').css('display', 'none');
							$('#other-exercises-div').css('display', 'flex');
						}, 200);
						setTimeout(() => {
							$('#other-exercises-div-inner').css('width', '80%');
							$('#other-exercises-div-inner').css('opacity', '1');
						}, 250);
					} else if ($('#cardio-exercise-div').css('display') == 'flex') {
						$('#cardio-exercise-div-inner').css('width', '50%');
						$('#cardio-exercise-div-inner').css('opacity', '0');
						$('.CSU-add-exercise-buttons-border').css('left', '66.666%');
						setTimeout(() => {
							$('#cardio-exercise-div').css('display', 'none');
							$('#other-exercises-div').css('display', 'flex');
						}, 200);
						setTimeout(() => {
							$('#other-exercises-div-inner').css('width', '80%');
							$('#other-exercises-div-inner').css('opacity', '1');
						}, 250);
					}
					break;
				case 'Cardio':
					$('#cardioExerciseName').val(data.Exercise_name);
					$('#cardioTime').val(data.Exercise_time_in_minutes);
					$('#cardioDes').val(data.Description);
					if ($('#muscle-building-exercise-div').css('display') == 'flex') {
						$('#muscle-building-exercise-div-inner').css('width', '50%');
						$('#muscle-building-exercise-div-inner').css('opacity', '0');
						$('.CSU-add-exercise-buttons-border').css('left', '33.333%');
						setTimeout(() => {
							$('#muscle-building-exercise-div').css('display', 'none');
							$('#cardio-exercise-div').css('display', 'flex');
						}, 200);
						setTimeout(() => {
							$('#cardio-exercise-div-inner').css('width', '80%');
							$('#cardio-exercise-div-inner').css('opacity', '1');
						}, 250);
					} else if ($('#other-exercises-div').css('display') == 'flex') {
						$('#other-exercises-div-inner').css('width', '50%');
						$('#other-exercises-div-inner').css('opacity', '0');
						$('.CSU-add-exercise-buttons-border').css('left', '33.333%');
						setTimeout(() => {
							$('#other-exercises-div').css('display', 'none');
							$('#cardio-exercise-div').css('display', 'flex');
						}, 200);
						setTimeout(() => {
							$('#cardio-exercise-div-inner').css('width', '80%');
							$('#cardio-exercise-div-inner').css('opacity', '1');
						}, 250);
					}
					break;
				}
			});
		}
	});

	$(document).on('click', 'button#edit-exercise-popup-btn', async () => {

		if ($('#muscle-building-exercise-div').css('display') == 'flex') {
			Exercise_name = $('#muscleExerciseName').val();
			Number_of_reps = $('#numberOfsets').val();
			Recommended_weight = $('#RecommendedWeight').val();
			Description = $('#muscleDes').val();
			if (Exercise_name != '' && Number_of_reps != '' && Recommended_weight != '' && Description != '') {
				muscleREQ = await fetch(`/coachs/client/trainingSchedule/${id}/${exID}/${exType}/${exDay}`, {
					method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						'type': 'Muscle',
						data: {
							Exercise_name,
							Number_of_reps,
							Recommended_weight,
							Description
						}
					})
				});
				if (muscleREQ.status === 200) {
					//Send refresh page to client
					socket.emit('refreshPage', id);
					muscleREQ.json().then(async (data) => {
						console.log(data);
						editExerciseHTML(data, 'Muscle', exDay, exID);
					});
					$('#add-exercise-popup').removeClass('is-visible');

				}
			}
		} else if ($('#cardio-exercise-div').css('display') == 'flex') {
			Exercise_name = $('#cardioExerciseName').val();
			Exercise_time_in_minutes = $('#cardioTime').val();
			Description = $('#cardioDes').val();
			editCardioHTML(exID, 'Cardio', day);

			if(Exercise_name != '' && Exercise_time_in_minutes!= '' && Description != ''){
				cardioREQ = await fetch(`/coachs/client/trainingSchedule/${id}/${exID}/${exType}/${exDay}`, {
					method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					headers: {
						'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						'type': 'Cardio',
						data: {
							Exercise_name,
							Exercise_time_in_minutes,
							Description
						}
					})
				});
				if (cardioREQ.status === 200) {
					socket.emit('refreshPage', id);
					cardioREQ.json().then(async (data) => {
						editCardioHTML(data, 'Cardio', exDay, exID);
					});
					$('#add-exercise-popup').removeClass('is-visible');
				}
			}
		} else {
			Exercise_name = $('#stretchesExerciseName').val();
			Description = $('#stretchesDes').val();
			if (Exercise_name != '' && Description != '') {
				otherREQ = await fetch(`/coachs/client/trainingSchedule/${id}/${exID}/${exType}/${exDay}`, {
					method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						'type': 'Stretches',
						data: {
							Exercise_name,
							Description
						}
					})
				});
				if (otherREQ.status === 200) {
					socket.emit('refreshPage', id);
					otherREQ.json().then(async (data) => {
						editStretchesHTML(data, 'Stretches', exDay, exID);
					});
					$('#add-exercise-popup').removeClass('is-visible');
				}
			}
		}
		clearAddPopupFields();
	});
	//*************************************************************************************************************************** */


	//***************************        Delete Exercise          *********************************

	$(document).on('click', 'i.CSU-exercise-delete-btn-icon', async (e) => {
		exID = e.target.getAttribute('id');
		exType = e.target.getAttribute('name');
		exDay = e.target.getAttribute('value');
		$('#cd-popup').addClass('is-visible');
	});

	var updateREQ;
	$('#deleteBTN').on('click', async () => {
		updateREQ = await fetch('/coachs/client/trainingSchedule/' + id, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				'id': exID,
				'type': exType,
				'day': exDay
			})
		});
		if (updateREQ.status === 200) {
			$('#cd-popup').removeClass('is-visible');
			$(`div#${exID}.CSU-exercise`).remove();
			exID = '';
			exType = '';
			exDay = '';
		}
	});
	$('#cd-popup-cancel-btn-close').on('click', function () {
		exID = '';
		exType = '';
		exDay = '';
		$('#cd-popup').removeClass('is-visible');
	});
	//*************************************************************************************************************************** */



	// *****************************************       Fucntions          *********************************************
	const clearAddPopupFields = () => {
		$('#muscleExerciseName').val('');
		$('#numberOfsets').val('');
		$('#RecommendedWeight').val('');
		$('#muscleDes').val('');
		$('#stretchesExerciseName').val('');
		$('#stretchesDes').val('');
		$('#cardioExerciseName').val('');
		$('#cardioTime').val('');
		$('#cardioDes').val('');
		$('#add-exercise-popup').removeClass('is-visible');
	};

	const editCardioHTML = (element, type, key, exID) => {
		$(`div#${exID}`).empty();
		$(`div#${exID}`).append(`	
		<div class="CSU-exercise-img-div">
			<img class="CSU-exercise-img" src="/images/treadmill.png" />
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
			<div class="CSU-exercise-info-piece-div" style="left: 40%;">
				<div class="CSU-exercise-info-piece-title">Exercise time:</div>
				<div class="CSU-exercise-info-piece">${element.Exercise_time_in_minutes}</div>
				<div class="CSU-exercise-info-piece" style="margin-left: 5px;">Minutes</div>
			</div>
		</div>
		<div class="CSU-exercise-info-row-div">
			<div class="CSU-exercise-info-piece-title">Description:</div>
			<div class="CSU-exercise-info-piece-text">${element.Description}</div>
			<div class="CSU-exercise-edit-btn">
				<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-edit-btn-icon fas fa-edit"></i>
			</div>
			<div class="CSU-exercise-delete-btn">
				<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-delete-btn-icon fas fa-trash-alt"></i>
			</div>
		</div>`);
		$(`div#${exID}`).attr('id', exID);
		return;
	};

	const editExerciseHTML = (element, type, key, exID) => {
		$(`div#${exID}`).empty();
		$(`div#${exID}`).append(`	
		<div class="CSU-exercise-img-div">
			<img class="CSU-exercise-img" src="/images/weight.png" />
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="left: 40%;">
					<div class="CSU-exercise-info-piece-title">Sets:</div>
					<div class="CSU-exercise-info-piece">${element.Number_of_reps}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="right: 10px;">
					<div class="CSU-exercise-info-piece-title">Recommended weight:</div>
					<div class="CSU-exercise-info-piece">${element.Recommended_weight}</div>
					<div class="CSU-exercise-info-piece">Kg</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece-text">${element.Description}</div>
				<div class="CSU-exercise-edit-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-edit-btn-icon fas fa-edit"></i>
				</div>
				<div class="CSU-exercise-delete-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-delete-btn-icon fas fa-trash-alt"></i>
				</div>
			</div>
		</div>`);
		$(`div#${exID}`).attr('id', element._id);
		return;
	};

	const editStretchesHTML = (element, type, key, exID) => {
		$(`div#${exID}`).empty();
		$(`div#${exID}`).append(`
		<div class="CSU-exercise-img-div">
			<i class="CSU-exercise-img-icon fas fa-walking"></i>
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece-text">${element.Description}</div>
				<div class="CSU-exercise-edit-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-edit-btn-icon fas fa-edit"></i>
				</div>
				<div class="CSU-exercise-delete-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-delete-btn-icon fas fa-trash-alt"></i>
				</div>
			</div>
		</div>`);
		$(`div#${exID}`).attr('id', element._id);
		return;
	};

	const addExerciseHTML = (element, type, key) => {
		var html = `<div id="${element._id}" class="CSU-exercise">
		<div class="CSU-exercise-img-div">
			<img class="CSU-exercise-img" src="/images/weight.png" />
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="left: 40%;">
					<div class="CSU-exercise-info-piece-title">Sets:</div>
					<div class="CSU-exercise-info-piece">${element.Number_of_reps}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="right: 10px;">
					<div class="CSU-exercise-info-piece-title">Recommended weight:</div>
					<div class="CSU-exercise-info-piece">${element.Recommended_weight}</div>
					<div class="CSU-exercise-info-piece">Kg</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece-text">${element.Description}</div>
				<div class="CSU-exercise-edit-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-edit-btn-icon fas fa-edit"></i>
				</div>
				<div class="CSU-exercise-delete-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-delete-btn-icon fas fa-trash-alt"></i>
				</div>
			</div>
		</div>
	</div>`;
		return html;
	};

	const addCardioHTML = (element, type, key) => {
		var html = `<div id="${element._id}" class="CSU-exercise">
		<div class="CSU-exercise-img-div">
			<img class="CSU-exercise-img" src="/images/treadmill.png" />
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="left: 40%;">
					<div class="CSU-exercise-info-piece-title">Exercise time:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_time_in_minutes}</div>
					<div class="CSU-exercise-info-piece" style="margin-left: 5px;">Minutes</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece-text">${element.Description}</div>
				<div class="CSU-exercise-edit-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-edit-btn-icon fas fa-edit"></i>
				</div>
				<div class="CSU-exercise-delete-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-delete-btn-icon fas fa-trash-alt"></i>
				</div>
			</div>
		</div>
	</div>`;
		return html;
	};

	const addStretchesHTML = (element, type, key) => {
		var html = `<div id="${element._id}" class="CSU-exercise">
		<div class="CSU-exercise-img-div">
			<i class="CSU-exercise-img-icon fas fa-walking"></i>
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece-text">${element.Description}</div>
				<div class="CSU-exercise-edit-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-edit-btn-icon fas fa-edit"></i>
				</div>
				<div class="CSU-exercise-delete-btn">
					<i id="${element._id}" name="${type}" value="${key}" class="CSU-exercise-delete-btn-icon fas fa-trash-alt"></i>
				</div>
			</div>
		</div>
	</div>`;
		return html;
	};

	$(document).keyup(function (event) {
		if (event.which == '27') {
			$('#cd-popup').removeClass('is-visible');
		}
	});


	function diff_years(dt2) {
		let dt1 = new Date();
		let dt3 = new Date(dt2);
		let dd = dt1.getDate();
		let mm = dt1.getMonth() + 1;

		let yyyy = dt1.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		let today = yyyy + '-' + mm + '-' + dd;
		dt1 = new Date(today);

		let diff = (dt1.getTime() - dt3.getTime()) / 1000;
		diff /= (60 * 60 * 24);
		return Math.floor(((diff / 365.25)));
	}
});