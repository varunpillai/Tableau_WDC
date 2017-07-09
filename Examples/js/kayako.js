(function() {
	  var DEPARTMENT_KEY = {
		"6": "Line Item Alerts",
		"2": "Ad Platform support",
		"11": "Cox Media",
		"10": "TWC / Charter",
		"9": "ANX Console creative updates",
		"8": "Charter Creatives",
		"7": "Creative Audit Failed",
		"3": "Service Provider Customers",
		"4": "Creative Audit Success",
		"12": "Reporting, Analytics & Data Management",
		"17": "MVPD Local",
		"18": "APCO",
		"19": "Politics",
		"20": "Healthcare",
		"21": "Accounting Process Engineering",
		"23": "Learning and R&D",
		"25": "IT Systems & Platforms",
		"29": "MVPD Corporate",
		"30": "MVPD Programmer"
  };
 var TICKET_KEY = {
		"14": "Backlog",
		"6": "Order Insertion",
		"1": "Issue",
		"7": "Billing",
		"2": "Task",
		"3": "Bug",
		"4": "Lead",
		"5": "Feedback",
		"8": "Audience Analysis",
		"9": "Ad-Hoc Report/Analysis",
		"10": "Recurring Report/Analysis",
		"11": "Process Engineering",
		"12": "Client Onboarding",
		"16": "In-House Onboarding",
		"13": "Data Usage Reporting",
		"15": "Campaigns",
		"17": "Misc"
  };	
  var STATUS_KEY = {
		"4": "Open",
		"8": "In Progress",
		"5": "On Hold due to Customer",
		"7": "On Hold due to AP",
		"9": "Needs Review",
		"6": "Closed"
  };	
 var PRIORITIES_KEY = {
		"7": "Low",
		"8": "Medium",
		"9": "High",
		"10": "Urgent",
		"12": "Critical",
		"11": "Emergency",
		"14": "A- Interrupt",
		"13": "B- Per Due Date",
		"15": "C- Backlog"
  };	
  var FLAG_KEY = {
	  	"0": "None",
		"1": "Purple",
		"2": "Orange",
		"3": "Green",
		"4": "Yellow",
		"5": "Red",
		"6": "Blue"
  };  

    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
			{ id:"ticketid", alias: "ticketid", dataType: tableau.dataTypeEnum.string},
			{ id:"flagtype", alias: "flagtype", dataType: tableau.dataTypeEnum.string},
			{ id:"displayid", alias: "displayid", dataType: tableau.dataTypeEnum.string},
			{ id:"departmentid", alias: "departmentid", dataType: tableau.dataTypeEnum.string},
			{ id:"statusid", alias: "statusid", dataType: tableau.dataTypeEnum.string},
			{ id:"priorityid", alias: "priorityid", dataType: tableau.dataTypeEnum.string},
			{ id:"typeid", alias: "typeid", dataType: tableau.dataTypeEnum.string},
			{ id:"userid", alias: "userid", dataType: tableau.dataTypeEnum.string},
			{ id:"ownerstaffid", alias: "ownerstaffid", dataType: tableau.dataTypeEnum.string},
			{ id:"ownerstaffname", alias: "ownerstaffname", dataType: tableau.dataTypeEnum.string},
			{ id:"fullname", alias: "fullname", dataType: tableau.dataTypeEnum.string},
			{ id:"email", alias: "email", dataType: tableau.dataTypeEnum.string},
			{ id:"lastreplier", alias: "lastreplier", dataType: tableau.dataTypeEnum.string},
			{ id:"subject", alias: "subject", dataType: tableau.dataTypeEnum.string},
			{ id:"creationtime", alias: "creationtime", dataType: tableau.dataTypeEnum.datetime},
			{ id:"lastactivity", alias: "lastactivity", dataType: tableau.dataTypeEnum.string},
			{ id:"laststaffreply", alias: "laststaffreply", dataType: tableau.dataTypeEnum.string},
			{ id:"lastuserreply", alias: "lastuserreply", dataType: tableau.dataTypeEnum.datetime},
			{ id:"slaplanid", alias: "slaplanid", dataType: tableau.dataTypeEnum.string},
			{ id:"nextreplydue", alias: "nextreplydue", dataType: tableau.dataTypeEnum.datetime},
			{ id:"resolutiondue", alias: "resolutiondue", dataType: tableau.dataTypeEnum.datetime},
			{ id:"replies", alias: "replies", dataType: tableau.dataTypeEnum.string},
			{ id:"isescalated", alias: "isescalated", dataType: tableau.dataTypeEnum.string},
			{ id:"tags", alias: "tags", dataType: tableau.dataTypeEnum.string},
			{ id:"note", alias: "note", dataType: tableau.dataTypeEnum.string}
		];

        var tableSchema = {
            id: "KayakoTicketList",
            // alias: "List of all Kayako Tickets",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
  myConnector.getData = function(table, doneCallback) {
    var connectAuth = JSON.parse(tableau.connectionData);

    var xhr = $.ajax({
          url: "https://www.learndataautomation.com/tableau_wdc/callback.php?apikey="+connectAuth.apiKey+"&company="+connectAuth.companyName,
	  type: "GET",
	  headers: { "Accept": "application/xml; odata=verbose" },
	  dataType:'xml',
      success: function (response) {
        var ticketslist = $(response).find('tickets');

        var tableData = [];
        $(ticketslist).find('ticket').each(function () {

          // Build a row from the parsed response
          tableData.push({
				'ticketid':  $(this).attr('id'),
				'flagtype':  FLAG_KEY[$(this).attr('flagtype')],
				'displayid':  $(this).find('displayid').text().trim(),
				'departmentid':  DEPARTMENT_KEY[$(this).find('departmentid').text().trim()],
				'statusid':  STATUS_KEY[$(this).find('statusid').text().trim()],
				'priorityid':  PRIORITIES_KEY[$(this).find('priorityid').text().trim()],
				'typeid':  TICKET_KEY[$(this).find('typeid').text().trim()],
				'userid':  $(this).find('userid').text().trim(),
				'ownerstaffid':  $(this).find('ownerstaffid').text().trim(),
				'ownerstaffname':  $(this).find('ownerstaffname').text().trim(),
				'fullname':  $(this).find('fullname').text().trim(),
				'email':  $(this).find('email').text().trim(),
				'lastreplier':  $(this).find('lastreplier').text().trim(),
				'subject':  $(this).find('subject').text().trim(),
				'creationtime':  moment(new Date($(this).find('creationtime').text().trim()*1000)).format("MM-DD-YYYY HH:mm:ss"),
				'lastactivity':  moment(new Date($(this).find('lastactivity').text().trim()*1000)).format("MM-DD-YYYY HH:mm:ss"),
				'laststaffreply':  $(this).find('laststaffreply').text().trim(),
				'lastuserreply':  moment(new Date($(this).find('lastuserreply').text().trim()*1000)).format("MM-DD-YYYY HH:mm:ss"),
				'slaplanid':  $(this).find('slaplanid').text().trim(),
				'nextreplydue':  moment(new Date($(this).find('nextreplydue').text().trim()*1000)).format("MM-DD-YYYY HH:mm:ss"),
				'resolutiondue':  moment(new Date($(this).find('resolutiondue').text().trim()*1000)).format("MM-DD-YYYY HH:mm:ss"),
				'replies':  $(this).find('replies').text().trim(),
				'isescalated':  $(this).find('isescalated').text().trim(),
				'tags':  $(this).find('tags').text().trim(),
				'note':  $(this).find('[id]').text().trim()
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
			var connectAuth = {
            			companyName: $('#kayakoURL').val().trim(),
            			apiKey: $('#apiKey').val().trim()
        		};
            tableau.connectionName = "Kayako Ticket List"; // This will be the data source name in Tableau
	    tableau.connectionData = JSON.stringify(connectAuth);
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
