function recognize(imag, imagWidth, imagHeight){
	var width = 10, height = 10;
	var resultArray = downsample(imag, imagWidth, imagHeight, width, height);
	var probArray = new Array();
	var result = 0;
	
	var templates = new Array();
	
	templates[0] =  [-1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1];
	templates[1] =  [1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1];
	templates[2] =  [-1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	templates[3] =  [1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1];
	templates[4] =  [-1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1];
	templates[5] =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	templates[6] =  [-1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1];
	templates[7] =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1];
	templates[8] =  [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1];
	templates[9] =  [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, -1];
	/*^*/ templates[10] = [-1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1];
	/*v*/ templates[11] = [1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1];
	/*S*/ templates[12] = [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1];
	/*M*/ templates[13] = [1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1];
	/*W*/ templates[14] = [1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 1, -1, -1, -1, 1, -1, 1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1];
	/*P*/ templates[15] = [-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
		
	//Just numbers between 0-9:
	for(var i = 0; i < 10; i++){ 
	//Just shapes:
	//for(var i = 10; i < templates.length; i++){ 
		probArray[i] = 0;
		euc = 0;
		for(var j = 0; j < resultArray.length; j++){
			euc = euc + (resultArray[j] - templates[i][j])*(resultArray[j] - templates[i][j]);
		}
		probArray[i] = Math.sqrt(euc);
		
	}
	
	var prob = 10000;
	for(var i = 0; i < probArray.length; i++){
		if(probArray[i] < prob){
			prob = probArray[i];
		}
	}
	
	for(var i = 0; i < probArray.length; i++){
		if(prob == probArray[i]){
			if(i == 10){result = '^';}
			else if(i == 11){result = 'V';}
			else if(i == 12){result = 'S';}
			else if(i == 13){result = 'M';}
			else if(i == 14){result = 'W';}
			else if(i == 15){result = 'P';}
			else result = i;
		}
	}
	
	/* Start Correction Steps */
		if(result == 5 && (resultArray[18] == 1 || resultArray[19] == 1 || resultArray[28] == 1 || resultArray[29] == 1)){
			if(resultArray[20] == 1 || resultArray[21] == 1){
				console.log('Correction 5 -> 9');
				result = 9;
			}
			else{
				console.log('Correction 5 -> 3');
				result = 3;				
			}
		}
		else if(result == 9 && resultArray[18] != 1 && resultArray[19] != 1 && resultArray[28] != 1 && resultArray[29] != 1){
			console.log('Correction 9 -> 5');
			result = 5;
		}
		else if(result == 3 && (resultArray[20] == 1 || resultArray[21] == 1)){
			if(resultArray[28] == 1 || resultArray[29] == 1){
				console.log('Correction 3 -> 9');
				result = 9;
			}
			else{
				console.log('Correction 3 -> 5');
				result = 5;
			}
		}
	/* End Correction Steps */
	console.log('probArray: ' + probArray);
	console.log('result: ' + result + ', probability: ' + prob);
	
	return result;
}

function downsample(imag, imagWidth, imagHeight, width, height){
	
	var bounds = getBounds(imag, imagWidth, imagHeight);
	
	var cellWidth = Math.floor((bounds[6] - bounds[2]) / width),
		cellHeight = Math.floor((bounds[5] - bounds[1]) / height);
		
	console.log('cellWidth: ' + cellWidth + ', cellHeight: ' + cellHeight);
	
	if(Math.abs(cellWidth - cellHeight) >= 10){
		if(cellWidth < 7) cellWidth = 7;
		if(cellHeight < 7) cellHeight = 7;
	}
	
	if(cellWidth == 0 || cellHeight == 0) return 0;
	
	var resultArr = new Array();
	
	for(var i = 0; i<(width*height); i++){
		
		var cropImag = imag.getImageData(((i%width)*(cellWidth)) + bounds[2], ((Math.floor(i/height))*(cellHeight)) + bounds[1], cellWidth, cellHeight);
		var cropImagData = cropImag.data;
		
		for(var m = 0; m < cropImagData.length; m=m+4){
			if(cropImagData[m] != 0){
				resultArr[i] = 1;
				break;
			}
			else{
				resultArr[i] = -1;
			}
		}
	}
	
	console.log('result:');
	console.log(resultArr[0] + ' ' + resultArr[1] + ' ' + resultArr[2] + ' ' + resultArr[3] + ' ' + resultArr[4] + ' ' + resultArr[5] + ' ' + resultArr[6] + ' ' + resultArr[7] + ' ' + resultArr[8] + ' ' + resultArr[9]);
	console.log(resultArr[10] + ' ' + resultArr[11] + ' ' + resultArr[12] + ' ' + resultArr[13] + ' ' + resultArr[14] + ' ' + resultArr[15] + ' ' + resultArr[16] + ' ' + resultArr[17] + ' ' + resultArr[18] + ' ' + resultArr[19]);
	console.log(resultArr[20] + ' ' + resultArr[21] + ' ' + resultArr[22] + ' ' + resultArr[23] + ' ' + resultArr[24] + ' ' + resultArr[25] + ' ' + resultArr[26] + ' ' + resultArr[27] + ' ' + resultArr[28] + ' ' + resultArr[29]);
	console.log(resultArr[30] + ' ' + resultArr[31] + ' ' + resultArr[32] + ' ' + resultArr[33] + ' ' + resultArr[34] + ' ' + resultArr[35] + ' ' + resultArr[36] + ' ' + resultArr[37] + ' ' + resultArr[38] + ' ' + resultArr[39]);
	console.log(resultArr[40] + ' ' + resultArr[41] + ' ' + resultArr[42] + ' ' + resultArr[43] + ' ' + resultArr[44] + ' ' + resultArr[45] + ' ' + resultArr[46] + ' ' + resultArr[47] + ' ' + resultArr[48] + ' ' + resultArr[49]);
	console.log(resultArr[50] + ' ' + resultArr[51] + ' ' + resultArr[52] + ' ' + resultArr[53] + ' ' + resultArr[54] + ' ' + resultArr[55] + ' ' + resultArr[56] + ' ' + resultArr[57] + ' ' + resultArr[58] + ' ' + resultArr[59]);
	console.log(resultArr[60] + ' ' + resultArr[61] + ' ' + resultArr[62] + ' ' + resultArr[63] + ' ' + resultArr[64] + ' ' + resultArr[65] + ' ' + resultArr[66] + ' ' + resultArr[67] + ' ' + resultArr[68] + ' ' + resultArr[69]);
	console.log(resultArr[70] + ' ' + resultArr[71] + ' ' + resultArr[72] + ' ' + resultArr[73] + ' ' + resultArr[74] + ' ' + resultArr[75] + ' ' + resultArr[76] + ' ' + resultArr[77] + ' ' + resultArr[78] + ' ' + resultArr[79]);
	console.log(resultArr[80] + ' ' + resultArr[81] + ' ' + resultArr[82] + ' ' + resultArr[83] + ' ' + resultArr[84] + ' ' + resultArr[85] + ' ' + resultArr[86] + ' ' + resultArr[87] + ' ' + resultArr[88] + ' ' + resultArr[89]);
	console.log(resultArr[90] + ' ' + resultArr[91] + ' ' + resultArr[92] + ' ' + resultArr[93] + ' ' + resultArr[94] + ' ' + resultArr[95] + ' ' + resultArr[96] + ' ' + resultArr[97] + ' ' + resultArr[98] + ' ' + resultArr[99]);
	
	var resultArrText = "";
	for(var i = 0; i<resultArr.length; i++){
		resultArrText = resultArrText + resultArr[i].toString() + ', ';
	}
	console.log('resultArrText: ' + resultArrText);
	//console.log(resultArr);
	return resultArr;
	
}

function getBounds(imag, imagWidth, imagHeight){
	var imgData = imag.getImageData(0, 0, imagWidth, imagHeight).data;
	var mostTopPixX = imagWidth, mostTopPixY = imagHeight, 
		mostLeftPixX = imagWidth, mostLeftPixY = imagHeight,
		mostRightPixX = 0, mostRightPixY = 0,
		mostDownPixX = 0, mostDownPixY = 0;
	
	for(var i = 0; i<imgData.length; i=i+4)
	{
		if(imgData[i] == 255){
			currentPixX = (i/4)%imagWidth;
			currentPixY = Math.floor((i/4)/imagWidth);
			
			if(currentPixX < mostLeftPixX){
				mostLeftPixX = currentPixX;
				mostLeftPixY = currentPixY;
			}
			
			if(currentPixY < mostTopPixY){
				mostTopPixX = currentPixX;
				mostTopPixY = currentPixY;
			}
			
			if(currentPixY > mostDownPixY){
				mostDownPixX = currentPixX;
				mostDownPixY = currentPixY;
			}
			
			if(currentPixX > mostRightPixX){
				mostRightPixX = currentPixX;
				mostRightPixY = currentPixY;
			}			
		}
	}
	
	/*console.log('mostTopPixX: ' + mostTopPixX + ', mostTopPixY: ' + mostTopPixY);
	console.log('mostLeftPixX: ' + mostLeftPixX + ', mostLeftPixY: ' + mostLeftPixY);
	console.log('mostDownPixX: ' + mostDownPixX + ', mostDownPixY: ' + mostDownPixY);
	console.log('mostRightPixX: ' + mostRightPixX + ', mostRightPixY: ' + mostRightPixY);*/
	
	return[mostTopPixX, mostTopPixY, mostLeftPixX, mostLeftPixY, mostDownPixX, mostDownPixY, mostRightPixX, mostRightPixY];
}








