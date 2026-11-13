window.onload = (event) => {
    console.log("fully loaded");
	if (typeof respecConfig == 'undefined' || respecConfig.specStatus == 'WV' || respecConfig.specStatus == 'wv') {
		if (document.respec) {		
			document.respec.ready.then(function () {
				console.log("panZoomImg ready");
				panZoomImg();	
			});
		}
		else {
			console.log("panZoomImg ",  respecConfig=='undefined');
			panZoomImg();
		}
	}
	else {
		console.log("NO panZoomImg");
		if (document.respec) {		
			document.respec.ready.then(function () {
				console.log("panZoomImg ready 2");
				panZoomImg();	
			});
		}
	}
};

//window.onload();


function panZoomImg() {
	oImgInfo = document.getElementsByClassName('imageinfo');
    console.log("imageinfo", oImgInfo.length);
    map = [];
            
	for (i=0; i<oImgInfo.length; i++) {	
		polygons = null;
        resizeFactor = 1;
		
		img = oImgInfo[i].querySelector("img");
        imgParent = img.parentNode;
		mapRoot = oImgInfo[i].querySelector("map");
        mapParent = mapRoot ? mapRoot.parentNode : null;
		mapId   = mapRoot ? mapRoot.attributes[0].nodeValue : window.URL.createObjectURL(new Blob([])).split('/').pop();
        mapArea = mapRoot ? mapRoot.children : null;
        
        if (!mapId && img && img.attributes && img.attributes.usemap)	{
		  mapId = img.attributes.usemap.value;				
		}
		
		//if (img.clientWidth < img.naturalWidth || img.clientHeight < img.naturalHeight)	{	 // check if image is geschaald
		if (img && mapId) {
            mapHeight = img.clientHeight;
			mapWidth = img.clientWidth;		
			scaleX = mapWidth / img.naturalWidth;
			scaleY = mapHeight / img.naturalHeight;
			imgSrc = img.src;
            if (mapWidth > 800) {
	            console.log('mapWidth', mapWidth, scaleX, scaleY);
				scaleX = 800 / mapWidth;
                scaleY = scaleX;
                mapWidth = 800;
                mapHeight *= scaleY;
	            console.log('mapWidth', mapWidth, scaleX, scaleY);
			}
    		
			if (mapRoot) {
				mapArea = mapRoot.children;
				polygons = [];
				hrefs=[];
				for (j = 0; j < mapArea.length; j++) {		
					polygons[j] = scaleCoords(mapArea[j].attributes[2].value, scaleX, scaleY);	//coords
					hrefs[j] = mapArea[j].attributes[3].value;	
				}
                // remove map
                mapParent.removeChild(mapRoot);
			}

			// replace img with panZoomImg
			mapContainer = imgParent.insertBefore(document.createElement("div"), img);
			imgParent.removeChild(img);

            mapContainer.setAttribute("id", mapId);
			mapContainer.setAttribute("class", 'panZoomImageMap');
            mapContainer.style.minHeight= '170px';
			mapContainer.style.minWidth = '405px';
			mapContainer.style.background = 'white';
			//mapContainer.style.height = resizeFactor*mapHeight + 'px';
			//mapContainer.style.width = resizeFactor*mapWidth + 'px';
			mapContainer.style.border = 'solid 1px grey';

			map[i] = L.map(mapId, {zoomSnap: 0 , attributionControl: false, zoomControl: false, scrollWheelZoom: false}).setView([0, 0], 11);		

            bounds = map[i].getBounds();
            console.log(bounds);
			imageOverlay = L.imageOverlay(imgSrc, map[i].getBounds()).addTo(map[i]);
			
			map[i].fitBounds(imageOverlay.getBounds(), { 'paddingTopLeft': [2, 0] });
			
			//map[i].setView(imageOverlay.getCenter(), map[i].getZoom());
            
			L.Control.OpenWindow = L.Control.extend({
				options: { position: 'topleft' },
				onAdd: function(map) {
					var el = L.DomUtil.create('div', 'leaflet-bar leaflet-control custom-control-openwindow');
					el.innerHTML = '<a class="leaflet-control-zoom-in" href="'+imgSrc+'" target="_blank" role="button" aria-label="Open window" aria-disabled="false"><span aria-hidden="true">&#8599;</span></a>';
					return el; 
				},
				onRemove: function(map) {
					// Nothing to do here
				}
			});
			L.control.openWindow = function(opts) { return new L.Control.OpenWindow(opts); };			
			L.control.openWindow({ position: 'topleft' }).addTo(map[i]);

			L.control.zoom({ position: 'topleft' }).addTo(map[i]);		
			
			L.Control.Refresh = L.Control.extend({
				options: { position: 'topleft' },
				onAdd: function(map) {
					var el = L.DomUtil.create('div', 'leaflet-bar leaflet-control custom-control-refresh');
					el.innerHTML = '<a class="leaflet-control-zoom-in" href="#" onclick="return false;" title="Refresh" role="button" aria-label="Refresh" aria-disabled="false"><span aria-hidden="true">&#8635;</span></a>';
							
					el.children[0].onclick = function(e) {					
						imgLayer = Object.values(map._layers)[0];
						bounds = imgLayer.getBounds();						
						map.fitBounds(bounds, { 'paddingTopLeft': [1.8, 0] });
						return false;					
					};
					return el;
				},
				onRemove: function(map) {
					// Nothing to do here
				}
			});
			L.control.refresh = function(opts) { return new L.Control.Refresh(opts); }	
			L.control.refresh({ position: 'topleft' }).addTo(map[i]);			
						
			// add polygons	
			if (polygons != null) {
				for (j=0; j<polygons.length; j++) {
					coords = polygons[j].split(',');
					minX = resizeFactor*coords[0], 
                    minY = resizeFactor*coords[1], 
                    maxX = resizeFactor*coords[2], 
                    maxY = resizeFactor*coords[3];
					
					c1 = map[i].containerPointToLatLng(L.point(minX, minY));
					c2 = map[i].containerPointToLatLng(L.point(maxX, maxY));						
					
					polygon = L.rectangle([c1, c2], {opacity:0, fillOpacity:0});			
					polygon.options.href = hrefs[j];						
					polygon.on('click', function(e) {
						window.location.href = e.target.options.href;				
					});						
					polygon.addTo(map[i]);
				}
			}
		}
	}
}

function scaleCoords(mapAreaCoords, scaleX, scaleY) {	
	let mapAreaCoordsArr = mapAreaCoords.split(',');
	let cMapAreaCoordsArr = [];	
	cMapAreaCoordsArr[0] = mapAreaCoordsArr[0] * scaleX; // minX * scalefactorWidth
	cMapAreaCoordsArr[1] = mapAreaCoordsArr[1] * scaleY; // minY * scalefactorHeight
	cMapAreaCoordsArr[2] = mapAreaCoordsArr[2] * scaleX; // maxX * scalefactorWidth
	cMapAreaCoordsArr[3] = mapAreaCoordsArr[3] * scaleY; // maxY * scalefactorHeight
	return cMapAreaCoordsArr.join(',');	
} 