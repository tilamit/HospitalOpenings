(($)->

	init = ()->

		### LOADER MODAL FOR TEAM MEMBERS, SHOWCASE, PORTFOLIO AND BLOG SECTIONS ###

		loader 	 	 = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 250, easingIn : mina.easeinout } )
		loaderModal  = document.querySelector(".loader-modal")
		$loaderModal = $(loaderModal)
		$loaderModal.on "click", ".close-handle", (e)->
			$loaderModal.scrollTop 0
			$loaderModal.fadeOut 250, ()->
				$loaderModal.attr('class', 'loader-modal');
			return

		loaderLauncher = ( content, className, inject )->

			# CHECK IF content IS string OR (Node) element
			if typeof content is "string"
				contentType = content.match(/\.(md|htm[l]?|php)(\?.*)?$/)
				contentType = contentType[1]
			else if typeof Node is "object" and content instanceof Node or typeof content is "object" and typeof content.nodeType is "number" and typeof content.nodeName is "string" 
				contentType = "element"
			else
				return "Error: Unknown content type."

			# ajaxCallback = (inject)->
			# 	(data, textStatus, jqXHR)->
			# 		$loaderModal.append(data).fadeIn(250, ()-> 
			# 			loader.hide()
			# 			if typeof inject is "function"
			# 				inject()
			# 			return
			# 		)

			loader.show()

			setTimeout ()-> 
				$loaderModal.addClass(className) if className isnt 'undefined' 
				$loaderModal.html('').append($("<span class='close-handle' />"))
				if contentType is "md"
					$.ajax
						url: content
						error: (data)->
							$loaderModal.append( themeConfig.ajaxErrorMessage.open + content + themeConfig.ajaxErrorMessage.close ).fadeIn(250, ()-> 
									loader.hide()
							)
						success: (data)->
							# MARKDOWN CONVERSION
							converter = new Markdown.Converter()
							data = converter.makeHtml(data)
							$loaderModal.append(data).fadeIn(250, ()-> 
									loader.hide()
							)
				else if contentType is "html" or contentType is "htm" or contentType is "php"
					((content, inject)->
						$.ajax
							url: content
							error: (data)->
								$loaderModal.append( themeConfig.ajaxErrorMessage.open + content + themeConfig.ajaxErrorMessage.close ).fadeIn(250, ()-> 
										loader.hide()
								)
							success: ( data )->
								window_height = $(window).height()
								injectable = $(data).find(".main").addClass('ajaxed secondary_section').css( "min-height", window_height )
								$loaderModal.append(injectable).fadeIn(250, ()-> 
										loader.hide()
										# INITIALIZE 3D LINK EFFECT
										((selector) ->
										  if !(themeConfig['GENERAL'].enable3DLinks or document.body.style['webkitPerspective'] != undefined or document.body.style['MozPerspective'] != undefined)
										    return
										  _p.slice(document.querySelectorAll('a.roll')).forEach (a) ->
										    a.innerHTML = '<span data-title="' + a.text + '">' + a.innerHTML + '</span>'
										    return
										  return
										)()
								)
								# ajaxCallback inject
					)(content, inject)	
				else if contentType is "element"
					$loaderModal.append( $(content).html() ).fadeIn(250, ()-> 
							loader.hide()
						)
			, 1000 

			return

		### SECTION: TEAM ###

		$(".team_member .linkify").on "click", (e)->
				e.preventDefault()
				_p.debugLog "Class 'ajax-call' detected."
				content = themeConfig["TEAM_MEMBERS"].dir + e.currentTarget.href
				loaderLauncher content, "loader-modal-content"

	( document.getElementById( 'loader' ) ) && ( document.querySelector(".loader-modal") ) && init();

)(jQuery)
