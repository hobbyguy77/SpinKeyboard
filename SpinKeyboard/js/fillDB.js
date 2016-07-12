var indexedDB = window.indexedDB || window.mozIndexedDB
		|| window.webkitIndexedDB || window.msIndexedDB, 
		IDBTransaction = window.IDBTransaction
		|| window.webkitIDBTransaction || window.msIDBTransaction, 
		baseName = "dictionary", 
		storeName = "patterns";

function loadDB(){
	var wordData = [{pattern : '+18-9+15-19+7',	word : 'tizen'}, 
	             {pattern : '+22-16+12-12',	word : 'awesome'}, 
	             {pattern : '+17',	word : 'is'}]; 
	var tizenDB = {};
	window.indexedDB = window.webkitIndexedDB ;
	var request = window.indexedDB.open("SpinDictionary");
	request.onsuccess = function (evt) {
		console.log("inside onsuccess");
		db = request.result;                                                            
	};
 
	request.onerror = function (evt) {
		console.log("IndexedDB error: " + evt.target.errorCode);
	};
	request.onupgradeneeded = function(evt) 
	{  
		console.log("inside onupgradeneeded");
 
		var objectStore = evt.currentTarget.result.createObjectStore(
				"patterns", { keyPath: "id", autoIncrement: true });
 
		objectStore.createIndex("pattern", "pattern", { unique: true });
		objectStore.createIndex("word", "word", { unique: false });
 
		for (i in wordData) {
			objectStore.add(wordData[i]);
			console.log("added objectstore to db");
		}
	};
}

function showDataRecord(pattern)
{
	var tizenDB = {};
	window.indexedDB = window.webkitIndexedDB ;
	var request = window.indexedDB.open("SpinDictionary");
	request.onsuccess = function (evt) {
		db = request.result;   
		var IDBTransaction =  window.webkitIDBTransaction;
		var transaction = db.transaction("patterns", IDBTransaction.READ_WRITE);
		var objectstore = transaction.objectStore("patterns");
		if(objectstore != null )
		{
			var index = objectstore.index("pattern" );
			var IDBKeyRange = window.webkitIDBKeyRange;
			if(IDBKeyRange != null)
			{
				console.log("range is not null");
				var range = IDBKeyRange.only(pattern) ;
				var request = index.get(pattern) ;
				if( request != null){
					request.onsuccess=function(event){
						var cursor = event.target.result;
						alert(cursor);
					}}
				else
					console.log("request is null");
			}
		}
	}
}

//function loadDB(){
//	clearStorage();
//	setData({pattern : '+18-9+15-19+7',	word : 'tizen'});
//	setData({pattern : '+22-16+12-12',	word : 'awesome'});
//	setData({pattern : '+17',	word : 'is'});
//}