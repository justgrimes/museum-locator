var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject('https://docs.google.com/spreadsheets/d/1rdvFhwpa2J59VDm8uJxn6Z7kUuKxe9FG8_qhHrBlBxM/pubhtml');

});

//callback: function(data, tabletop) { console.log(data) },
//callback: writeTableWith,

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
        {'mDataProp': 'mid', 'sTitle': 'Museum ID'},
		{'mDataProp': 'legalname', 'sTitle': 'Name'},
        //{'mDataProp': 'altname', 'sTitle': 'Name (alt)'},
        //{'mDataProp': 'adaddress', 'sTitle': 'Address'},
        {'mDataProp': 'adcity', 'sTitle': 'City'},
        {'mDataProp': 'adstate', 'sTitle': 'State'},
        {'mDataProp': 'adzip', 'sTitle': 'ZIP'},
        {'mDataProp': 'discipl', 'sTitle': 'Discipline'}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 10,
        'aaData': dataSource,
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};