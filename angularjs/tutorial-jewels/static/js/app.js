(function () {
	var app = angular.module('gemStore', []);
	app.controller('StoreController', function () {
		this.products = gems;
	});

	var gems = [
		{
			name: 'Dodecahedron',
			price: 2.95,
			description: 'Mauris a montes tincidunt cras sociis? Amet lacus amet penatibus dapibus mid a porta, enim amet vel porta adipiscing ridiculus magnis dignissim urna elementum nec in velit cursus integer ridiculus, natoque rhoncus. Turpis enim placerat sit pellentesque? Non mattis mattis? Ultricies porta ac ac eros! Penatibus urna urna et',
			canPurchase: false
		},
		{
			name: 'Bloodstone',
			price: 5.95,
			description: 'Mauris a montes tincidunt cras sociis? Amet lacus amet penatibus dapibus mid a porta, enim amet vel porta adipiscing ridiculus magnis dignissim urna elementum nec in velit cursus integer ridiculus, natoque rhoncus. Turpis enim placerat sit pellentesque? Non mattis mattis? Ultricies porta ac ac eros! Penatibus urna urna et',
			canPurchase: true
		},
		{
			name: 'Zircon',
			price: 3.95,
			description: 'Mauris a montes tincidunt cras sociis? Amet lacus amet penatibus dapibus mid a porta, enim amet vel porta adipiscing ridiculus magnis dignissim urna elementum nec in velit cursus integer ridiculus, natoque rhoncus. Turpis enim placerat sit pellentesque? Non mattis mattis? Ultricies porta ac ac eros! Penatibus urna urna et',
			canPurchase: true
		}
	]
})();
