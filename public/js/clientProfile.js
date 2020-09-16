$(document).ready(async () => {
    const clientdata = ['name', 'age', 'height', 'weight','createdAt']

    // GET client Profile data
    const getClientProfile = await fetch("/clients/myProfile", {
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
    })
    // Load Client nutrition
    getClientProfile.json().then((data) => {
        clientdata.forEach((elem) => {
            if (elem === 'height') $("#" + elem).append(' ' + data[elem] + ' CM')
            else if (elem === 'weight') $("#" + elem).append(' ' + data[elem] + ' KG')
            else if (elem === 'createdAt') $("#" + elem).append(' ' + data[elem].split('T')[0])
            else $("#" + elem).append(' ' + data[elem])
        })
    })

    $('#logout').mouseover((e)=>{
        $(e.target).css('cursor', 'pointer')
    })
    $('#logout').click( async()=>{
        const logout = await fetch("/clients/logout", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        })
        
        if (logout.status === 200) {
            logout.json().then(() => {
                window.location.href = ("/")
            })
        }
    })
    $('#P-Change-pass-btn').on('click', function(event){
		event.preventDefault();
		$('#cd-changepass-popup').addClass('is-visible2');
	});
	
	$('#cd-changepass-popup-close').on('click', function(event){
			event.preventDefault();
			$('#cd-changepass-popup').removeClass('is-visible2');
    });
    
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('#cd-changepass-popup').removeClass('is-visible2');
	    }
    });

    $('#P-popup-trigger').on('click', function(event){
		event.preventDefault();
		$('#cd-popup').addClass('is-visible');
	});

    $('#cd-popup-cancel-btn-close').on('click', function(event){
        event.preventDefault();
        $('#cd-popup').removeClass('is-visible');
    });
    
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('#cd-popup').removeClass('is-visible');
	    }
    });

})