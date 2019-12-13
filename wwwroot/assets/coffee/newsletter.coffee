###
 ______ _____   _______ _______ _______ _______ ______ _______ 
|   __ \     |_|    ___|_     _|   |   |       |   __ \   _   |
|    __/       |    ___| |   | |       |   -   |      <       |
|___|  |_______|_______| |___| |___|___|_______|___|__|___|___|

P L E T H O R A T H E M E S . C O M               (c) 2014-2015

File Description: MailChimp Form - Front End (HTML Version)
Dependencies: jQuery Validation Plugin, http://jqueryvalidation.org/
Version: 1.0.2

###

`
//= require ../js/libs/jquery.validate.min.js
`

(($) ->
	$ ->
		$newsletter = $('#newsletter')

		$newsletter.validate

			messages: themeConfig['NEWSLETTERS'] and themeConfig['NEWSLETTERS'].messages or {}

			showErrors: (errorMap, errorList) ->
				_p.debugLog 'errorMap', errorMap, 'errorList', errorList
				return

			invalidHandler: (event, validator) ->
				_p.debugLog validator.errorList[0].message
				# 'this' refers to the form
				errors = validator.numberOfInvalids()
				# if errors / else / 
				return

			submitHandler: (form) ->

				$.ajax
					type: 'POST'
					url: $('#newsletter').attr('action')
					data: 'email': $('#newsletter #email').val()
					dataType: 'json'
					success: (data) ->
						_p.debugLog data
						if data != false and data.status != 'error' 
							$('#newsletterResponse').text(themeConfig['NEWSLETTERS'].messages['successMessage']).removeClass('hidden').removeClass('btn-danger').addClass 'btn-success'
							$('#newsletter #email').val('').blur()
						else
							alert(data.error) if data.status is "error"
							$('#newsletterResponse').text(themeConfig['NEWSLETTERS'].messages['errorMessage']).removeClass('hidden').addClass 'btn-danger'
							$('#newsletter #email').blur()
						return
				return

			rules: email:
				required: true
				email: true

			# errorPlacement: (error, element) ->
			# highlight: (element) ->
			# unhighlight: (element) ->

		return

	return

) jQuery