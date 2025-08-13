$(document).ready(function() {
    var search_i = $('#searchInput').selectize({
        plugins: ["clear_button", "remove_button", "restore_on_backspace"],
        create: true,
        valueField: 'value',
        labelField: 'text',
        searchField: 'text',
        load: function (query, callback) {
            if (query.length < 1) {
                callback([]);
                return;
            }
            $.request('onSearchRecords', {
                data: {query: query},
                success: function (response) {
                    callback(response);
                }
            });
        },
        render: {
            option_create: function (data, escape) {
                return '<div class="create">Search for: <strong>' + escape(data.input) + '</strong>&hellip;</div>';
            }
        },
        highlight: true,
        sortField: 'text',
        loadThrottle: 300,
        noResultsText: 'No results found',
        onChange: function (value) {
            updateLibraryList();
        }
    });

    var select = $('#sortOrder, #sortType').selectize({
        onChange: function(value) {
            updateLibraryList();
        }
    });

    $('#applyFilter').on('click', updateLibraryList());

    $('#clearFilter').on('click',function() {
        var selectize = select[0].selectize;
        var selectize1 = select[1].selectize;
        selectize.setValue(0);
        selectize1.setValue('title asc');
        updateLibraryList();
    });

    var urlParams = window.location.search.substring(1).split('&');
    if(urlParams.length){
        for(i = 0; i < urlParams.length; i++){
            var paramArr = urlParams[i].split('=');
            var paramKey = paramArr[0];
            var paramVal = paramArr[1];
            if(typeof paramVal !== 'undefined'){
                var selectize = select[i].selectize;
                selectize.setValue(paramVal);
                updateLibraryList();
            }
        }

    }



});



function updateLibraryList() {
    var sortType = $('#sortType').val();

    if($('#sortType').length == 0){
        sortType = 0;
    }
    var sortOrder = $('#sortOrder').val();


    $.request('onSearchRecords', {
        data: {
            sortOrder: sortOrder,
            sortType: sortType,
        },
        update: { 'library_records': '#recordsContainer' }
    });
}


function getUrlParams(){
    var params = window.location.search.substring(1).split('&');
    console.log(params);
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    // var urlparam = [];
    // for (var i = 0; i < url.length; i++) {
    //     urlparam[] = url[i];
    //
    // }
    // return urlparam;
}


$(document).keydown(function(e) {

    // 191 = /
    if (e.keyCode === 191) {
        e.preventDefault();
        $('#searchInput')[0].selectize.focus();
    }

    // 27 = esc
    if (e.keyCode === 27) {
        e.preventDefault();
        $('#searchInput')[0].selectize.close();
        $('#searchInput')[0].selectize.blur();
    }
});
