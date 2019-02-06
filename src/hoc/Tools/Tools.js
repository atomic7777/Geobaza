


function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) 
        return false; // Invalid format
    var d = new Date(dateString);
    if (Number.isNaN(d.getTime())) 
        return false; // Invalid date
    return d
        .toISOString()
        .slice(0, 10) === dateString;
}