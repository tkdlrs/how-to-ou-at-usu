function myFunction() { // TODO: (*optional) update the function name

    var sheet = SpreadsheetApp.openByUrl('URL_GOES_HERE'); // TODO: UPDATE URL
    var label = GmailApp.getUserLabelByName('LABEL_GOES_HERE'); // TODO: UPDATE LABEL

    // Make an array of threads under a particular label
    var threads = label.getThreads();
    // Look through all of the threads for messages with the label
    for (var i = 0; i < threads.length; i++) {
        var msgs = threads[i].getMessageCount();

        for (var j = 0; j < msgs; j++) {
            var message = threads[i].getMessages()[j];
            //  Go through each message. If it’s starred turn it to simple text and then split that text into an array.

            if (message.isStarred() == true) {
                var info = message.getPlainBody();
                var date = message.getDate(); // *OPTIONAL -You do not need this unless you would like to collect a timestamp
                var infoExtract = info.split(' d(^_^)b '); // Choose a somewhat awkward delimiter that users won’t accidently use. Should match the delimiter in the email that the LDP form is sending.

                // Append the whole array to a new row in the sheet 
                sheet.appendRow(infoExtract);

                // Removes the star so each item gets added only once.
                message.unstar();
            }
        }
    }
}