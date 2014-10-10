(function($) {
	$().ready(function() {
		var product_suggest = $("#product_suggest");
		product_suggest.autocomplete(baseUrl + "modules/mod_vm_nb_ajaxsearch/assets/livesearch.php", {
			width: 300,
			max: 	product_suggest.data('max-item'),
			minChars:	product_suggest.data('min-chars'),
		    scroll: product_suggest.data('scroll'),
		    scrollHeight: product_suggest.data('scroll-height'),
			highlight: false,
			formatItem: function(data, i, n, value) {
				var product = $.parseJSON(value);
				return "<a class='product_link' href='" + product.link + "'><img class='product_thumb' src='" + baseUrl + product.thumb + "'/></a>" + product.name + product.price;
			},
			formatResult: function(data, value) {
				var product = $.parseJSON(value);
				return product.name;
			},
			selectFirst: false
		});
	});
})(jQuery)