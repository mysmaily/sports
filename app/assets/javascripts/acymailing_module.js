function submitacymailingform(task,formName){
	var varform = eval('document.'+formName);
	var filterEmail = /^([a-z0-9_'&\.\-\+=])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,10})+$/i;

	if(!varform.elements){
		//Try to get the right form as we may have several ones on the same page with the same ID... :(
		if(varform[0].elements['user[email]'] && varform[0].elements['user[email]'].value && filterEmail.test(varform[0].elements['user[email]'].value)){
			varform = varform[0];
		}else{
			varform = varform[varform.length - 1];
		}
	}

	 if(task != 'optout'){
		 nameField = varform.elements['user[name]'];
		 if(nameField && (( typeof acymailing != 'undefined' && nameField.value == acymailing['NAMECAPTION'] ) || nameField.value.replace(/ /g,"").length < 2)){
			 if(typeof acymailing != 'undefined'){ alert(acymailing['NAME_MISSING']); }
			 nameField.className = nameField.className +' invalid';
			 return false;
		 }
	 }

	 var emailField = varform.elements['user[email]'];
	 if(emailField){
		if(typeof acymailing == 'undefined' || emailField.value != acymailing['EMAILCAPTION']) emailField.value = emailField.value.replace(/ /g,"");
		if(!emailField || (typeof acymailing != 'undefined' && emailField.value == acymailing['EMAILCAPTION']) || !filterEmail.test(emailField.value)){
			if(typeof acymailing != 'undefined'){ alert(acymailing['VALID_EMAIL']); }
			emailField.className = emailField.className +' invalid';
			return false;
		}
	 }

	if(varform.elements['hiddenlists'].value.length < 1){
		var listschecked = false;
		var alllists = varform.elements['subscription[]'];
		if(alllists && typeof alllists.value == 'undefined'){
			for(b=0;b<alllists.length;b++){
				if(alllists[b].checked) listschecked = true;
			}
			if(!listschecked){ alert(acymailing['NO_LIST_SELECTED']); return false;}
		}
	}


	 if(task != 'optout' && typeof acymailing != 'undefined' && typeof acymailing['reqFields'+formName] != 'undefined' && acymailing['reqFields'+formName].length > 0){

		for(var i =0;i<acymailing['reqFields'+formName].length;i++){
			elementName = 'user['+acymailing['reqFields'+formName][i]+']';
			elementToCheck = varform.elements[elementName];
			if(elementToCheck){
				var isValid = false;
				if(typeof elementToCheck.value != 'undefined'){
					if(elementToCheck.value==' ' && typeof varform[elementName+'[]'] != 'undefined'){
						if(varform[elementName+'[]'].checked){
							isValid = true;
						}else{
							for(var a=0; a < varform[elementName+'[]'].length; a++){
								if((varform[elementName+'[]'][a].checked || varform[elementName+'[]'][a].selected) && varform[elementName+'[]'][a].value.length>0) isValid = true;
							}
						}
					}else{
						if(elementToCheck.value.replace(/ /g,"").length>0){
							if(typeof acymailing['excludeValues'+formName] == 'undefined' || typeof acymailing['excludeValues'+formName][acymailing['reqFields'+formName][i]] == 'undefined' || acymailing['excludeValues'+formName][acymailing['reqFields'+formName][i]] != elementToCheck.value) isValid = true;
						}
					}
				}else{
					for(var a=0; a < elementToCheck.length; a++){
						 if(elementToCheck[a].checked && elementToCheck[a].value.length>0) isValid = true;
					}
				}
				if(!isValid){
					elementToCheck.className = elementToCheck.className +' invalid';
					alert(acymailing['validFields'+formName][i]);
					return false;
				}
			}else{
				if((varform.elements[elementName+'[day]'] && varform.elements[elementName+'[day]'].value<1) || (varform.elements[elementName+'[month]'] && varform.elements[elementName+'[month]'].value<1) || (varform.elements[elementName+'[year]'] && varform.elements[elementName+'[year]'].value<1902)){
					if(varform.elements[elementName+'[day]'] && varform.elements[elementName+'[day]'].value<1) varform.elements[elementName+'[day]'].className = varform.elements[elementName+'[day]'].className + ' invalid';
					if(varform.elements[elementName+'[month]'] && varform.elements[elementName+'[month]'].value<1) varform.elements[elementName+'[month]'].className = varform.elements[elementName+'[month]'].className + ' invalid';
					if(varform.elements[elementName+'[year]'] && varform.elements[elementName+'[year]'].value<1902) varform.elements[elementName+'[year]'].className = varform.elements[elementName+'[year]'].className + ' invalid';
					alert(acymailing['validFields'+formName][i]);
					return false;
				}

				if((varform.elements[elementName+'[country]'] && varform.elements[elementName+'[country]'].value<1) || (varform.elements[elementName+'[num]'] && varform.elements[elementName+'[num]'].value<3)){
					if(varform.elements[elementName+'[country]'] && varform.elements[elementName+'[country]'].value<1) varform.elements[elementName+'[country]'].className = varform.elements[elementName+'[country]'].className + ' invalid';
					if(varform.elements[elementName+'[num]'] && varform.elements[elementName+'[num]'].value<3) varform.elements[elementName+'[num]'].className = varform.elements[elementName+'[num]'].className + ' invalid';
					alert(acymailing['validFields'+formName][i]);
					return false;
				}
			}
		}
	}

	var captchaField = varform.elements['acycaptcha'];
	if(captchaField){
		if(captchaField.value.length<1){
			if(typeof acymailing != 'undefined'){ alert(acymailing['CAPTCHA_MISSING']); }
			captchaField.className = captchaField.className +' invalid';
					return false;
		}
	}

	if(task != 'optout'){
		var termsandconditions = varform.terms;
		if(termsandconditions && !termsandconditions.checked){
			if(typeof acymailing != 'undefined'){ alert(acymailing['ACCEPT_TERMS']); }
			termsandconditions.className = termsandconditions.className +' invalid';
			return false;
		}
	}

	taskField = varform.task;
	taskField.value = task;

	// No Ajax ?
	if(!varform.elements['ajax'] || !varform.elements['ajax'].value || varform.elements['ajax'].value == '0'){
		varform.submit();
		return false;
	}

	// Get form values
	var form = $(formName);
	data = form.toQueryString();

	// Send the request
	if (typeof Ajax == 'function'){
		// Mootools < 1.2
		new Ajax(form.action, {
			data: data,
			method: 'post',
			onRequest: function()
			{
				// Change the acyba form's opacity to show we are doing stuff
				form.addClass('acymailing_module_loading');
				//We apply style in js as it would not be w3C compliant
				form.setStyle("filter:","alpha(opacity=50)");
				form.setStyle("-moz-opacity","0.5");
				form.setStyle("-khtml-opacity", "0.5");
				form.setStyle("opacity", "0.5");
			},
			onSuccess: function(response)
			{
				// Write the response in it's DOM container
				response = Json.evaluate(response);
				acymailingDisplayAjaxResponse(unescape(response.message), response.type, formName);
			},
			onFailure: function(){
				// Write an error message
				acymailingDisplayAjaxResponse('Ajax Request Failure', 'error', formName);
			}
		}).request();
	}else{
		// Mootools >= 1.2
		new Request.JSON({
			url: $(formName).action,
			data: data,
			method: 'post',
			onRequest: function()
			{
				// Change the acyba form's opacity to show we are doing stuff
				form.addClass('acymailing_module_loading');
				form.setStyle("filter:","alpha(opacity=50)");
				form.setStyle("-moz-opacity","0.5");
				form.setStyle("-khtml-opacity", "0.5");
				form.setStyle("opacity", "0.5");
			},
			onSuccess: function(response)
			{
				// Write the response in it's DOM container
				acymailingDisplayAjaxResponse(unescape(response.message), response.type, formName);
			},
			onFailure: function(){
				// Write an error message
				acymailingDisplayAjaxResponse('Ajax Request Failure', 'error', formName);
			}
		}).send();
	}

	return false;
}

function acymailingDisplayAjaxResponse(message, type, formName)
{
	// If the form is wrapped in a slider, we allow changing the slider height
	var toggleButton = $('acymailing_togglemodule_'+formName);
	if (toggleButton && toggleButton.hasClass('acyactive')) {
		var wrapper = toggleButton.getParent().getParent().getChildren()[1];
		wrapper.setStyle('height', '');
	};

	// Retrieve the responseContainer in case of we already created one
	var responseContainer = $$('#acymailing_fulldiv_'+formName+' .responseContainer')[0];
	if (typeof responseContainer == 'undefined'){
		//create a new div class=responseContainer as we didn't have one already to display the answer
		responseContainer = new Element('div');
		responseContainer.inject($('acymailing_fulldiv_'+formName), 'top');
		oldContainerHeight = '0px';
	}else{
		oldContainerHeight = responseContainer.getStyle('height');
	}

	//We reset the class name to responseContainer
	responseContainer.className = 'responseContainer';
	//We can remove the loading class from the form
	$(formName).removeClass('acymailing_module_loading');

	//We can set the content of responseContainer with the new message
	responseContainer.innerHTML = message;

	//We set the container class
	var form = $(formName);
	if(type == 'success'){
		responseContainer.addClass('acymailing_module_success');
	}else{
		responseContainer.addClass('acymailing_module_error');
		form.setStyle("filter:","alpha(opacity=100)");
		form.setStyle("-moz-opacity","1");
		form.setStyle("-khtml-opacity", "1");
		form.setStyle("opacity", "1");
	}

	newContainerHeight = responseContainer.getStyle('height');

	// Mootools < 1.2 ?
	if (typeof Ajax == 'function')
	{
		if(type == 'success'){
			// Display the response with a nice transition
			var myEffect = new Fx.Styles(form, {duration: 500, transition: Fx.Transitions.linear});
			myEffect.start({
				'height': [form.getSize().size.y, 0],
				'opacity': [1, 0]
			});
		}

		// Set the style of the response's container
		// We set all parameters to avoid a small period where the answer is displayed
		try {
			responseContainer.setStyle('height', oldContainerHeight+'px');
			responseContainer.setStyle("filter:","alpha(opacity=0)");
			responseContainer.setStyle("-moz-opacity","0");
			responseContainer.setStyle("-khtml-opacity", "0");
			responseContainer.setStyle("opacity", "0");
		}
		// Prevent an error in Internet Explorer < 9
		catch (e) {}

		// Display the response with a nice transition
		var myEffect2 = new Fx.Styles(responseContainer, {duration: 500, transition: Fx.Transitions.linear});
		myEffect2.start({
			'height': [oldContainerHeight, newContainerHeight],
			'opacity': [0, 1]
		});

	}
	else // Mootools >= 1.2
	{
		if(type == 'success'){
			// Display the response with a nice transition
			form.set('morph');
			form.morph({
				'height': '0px',
				'opacity': 0
			});
		}

		// Set the style of the response's container
		responseContainer.setStyles({
			'height': oldContainerHeight,
			'opacity': 0
		});

		// Display the response with a nice transition
		responseContainer.set('morph');
		responseContainer.morph({
			'height': newContainerHeight,
			'opacity': 1
		});
	}
}