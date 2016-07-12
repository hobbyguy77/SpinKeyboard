var db;

window.onload = function() {
	try {
		db = openDatabase("Dictionary", '1.0', "SpinKeyboard's dictionary",
				200000);
	} catch (e) {
		alert(e);
	}

	if (!db) {
		alert("Failed to connect to database.");
	}
	var msg;

	function onError(err) {
		console.log(err)
	}

	function setData() {
		db
				.transaction(function(tx) {
					tx
							.executeSql(
									'CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, pattern TEXT)',
									[], null, null);

					tx
							.executeSql(
									'INSERT INTO patterns (word, pattern) VALUES (?, ?)',
									[ 'tizen', '+18-9+15-19+7' ], null, onError);
					tx
							.executeSql(
									'INSERT INTO patterns (word, pattern) VALUES (?, ?)',
									[ 'is', '+17' ], null, onError);
					tx
							.executeSql(
									'INSERT INTO patterns (word, pattern) VALUES (?, ?)',
									[ 'awesome', '+22-16+12-12' ], null,
									onError);
				});
	}

};

function findWordInStorage(pattern) {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM patterns WHERE pattern LIKE '" + pattern
				+ "'", [], function(tx, results) {
			var len = results.rows.length, i;

			for (i = 0; i < len; i++) {
				msg = "<p>" + results.rows.item(i).word + "</p>";
				$("#result").append(msg);
			}
		}, onError);
	});
}