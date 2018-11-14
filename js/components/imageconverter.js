var ImageConverter = function(fileInput, picBuilder) {
	this.fileInput = fileInput;
	this.preview = picBuilder;
}

ImageConverter.prototype = {

	init: function() {
		this.fileInput.addEventListener('change', this.readImage.bind(this), false);
	},

	readImage: function(ev) {
		var file = ev.target.files[0];
		var reader = new FileReader();
		reader.addEventListener('load', this.processImage.bind(this), false);
		reader.readAsDataURL(file);
	},

	processImage: function(ev) {
		var img = new Image();
		img.src = ev.target.result;
		img.addEventListener('load', this.drawToCanvas.bind(this), false);		
	},

	drawToCanvas: function(ev) {
		var xPoint, yPoint, sqrImgData;
		var img = ev.target;
		var canvasEl = document.createElement('canvas');
		canvasEl.width = 200;
		canvasEl.height = 200;
		var canvas = canvasEl.getContext('2d');
		
		if(img.width >= img.height) {
			yPoint = ((img.width - img.height)/2) * (200/img.width);
			xPoint = 0; 
		} else {
			yPoint = 0;
			xPoint = ((img.height - img.width)/2) * (200/img.height);
		}
		canvas.drawImage(img, 0, 0, 200, 200);
		sqrImgData = canvas.getImageData(0, 0, 200, 200);
		this.generatePreview(sqrImgData);
	},

	generatePreview: function(data) {
		var pos;
		var isColour;
		var jsonResult = document.createElement('div');
		for(var x = 0; x < 200; x++) {
			for(var y = 0; y < 200; y++) {
				pos = (data.width * 4 * y) + (x * 4);
				if(data.data[pos] + data.data[pos+1] + data.data[pos+2] < 200) {
					this.preview.maybeFillDot(x, y);
				}
			}
		}
		this.preview.render();
		jsonResult.innerHTML = JSON.stringify(this.preview.getDotList());
		document.body.appendChild(jsonResult);
	}
}

module.exports = ImageConverter;