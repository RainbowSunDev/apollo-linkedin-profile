function calculateDuration(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if(months < 0) {
        years--;
        months += 12;
    }
    const result = years.toString() + " years and " + months.toString() + " months";
    return result;
}

export { calculateDuration }