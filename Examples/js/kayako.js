(function() {
	

    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
		{	id:	"displayid", alias:	"ticketid",	dataType: tableau.dataTypeEnum.string},
		{	id:	"departmentid", alias:	"departmentid",	dataType: tableau.dataTypeEnum.string},
		{	id:	"statusid", alias:	"ticketstatus",	dataType: tableau.dataTypeEnum.string},
		{	id:	"subject", alias:	"tickettitle",	dataType: tableau.dataTypeEnum.string}
		];

        var tableSchema = {
            id: "KayakoTicketList",
            alias: "List of all Kayako Tickets",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
  myConnector.getData = function(table, doneCallback) {

    var xhr = $.ajax({
      // url: tableau.connectionData,
	  url: "kayako_data.xml",
      success: function (response) {
        var ticketslist = $(response).find('tickets');

        var tableData = [];
        $(ticketslist).find('ticket').each(function () {

          // Build a row from the parsed response
          tableData.push({
            'displayid':  $(this).find('displayid').text().trim(),
            'departmentid': $(this).find('departmentid').text().trim(),
            'statusid':    $(this).find('statusid').text().trim(),
            'subject': $(this).find('subject').text().trim()
          });
        });
        
        table.appendRows(tableData);
        doneCallback();
        // tableau.dataCallback(tableData, "", false);
      }
    });
  };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			var kayakoURL = $('#kayakoURL').val().trim();
			var apiKey = $('#apiKey').val().trim();
			var connectionUrl = "http://" + kayakoURL + ".helpserve.com/api/index.php?e=/Tickets/Ticket/ListAll/12,17,18,19,20,21,23,24,25,29,30/&apikey=" + apiKey + "&salt=75996179&signature=f2YHCCJYVzLdGrd9MjPA0CvmHEPyXwAcmkjXk6Sldhs%3D"
            tableau.connectionName = "Kayako Ticket List"; // This will be the data source name in Tableau
			tableau.connectionData = connectionUrl;
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
