var db = openDatabase("Dictionary", '1.0', "SpinKeyboard's dictionary", 200000);
if (!db) {
	alert("Failed to connect to database.");
}
var msg;

function onError(err) {
	console.log(err)
}

function setData() {
	db.transaction(function(tx) {
				tx.executeSql(
								'CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, pattern TEXT)',
								[], null, null);

				tx.executeSql('INSERT INTO patterns (word, pattern) VALUES (?, ?)', [
						title_, description_], null, onError);
	});
}

function findWordInStorage(pattern) {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM patterns WHERE pattern LIKE '" + pattern + "'", [], function(tx, results) {
			var len = results.rows.length, i;

			for (i = 0; i < len; i++) {
				msg = "<p>" + results.rows.item(i).word + "</p>";
				$("#result").append(msg);
			}
		}, onError);
	});
}