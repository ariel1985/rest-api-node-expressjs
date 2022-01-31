/**
 * loops through filters and run operators key as functions 
 * sends value as function param
 * 
 * @returns json object with filtered data
 */
module.exports.apply_filters = function (data, filters) {
    output = 'nothing'
    f = filters["filters"]
    arr_filters = []
    if (f != undefined && f.length > 0) { // apply filters
        for (let i = 0; i < f.length; i++) { // filters loop
            field = f[i]["field"]
            ops = f[i]["operators"]
            if (f == undefined) break
            for (const op in ops) { // operators loop
                switch (op) {
                    case 'lt':
                        if (!Number.isFinite(ops[op])) throw new Error("Expecting a number", ops[op])
                        data = less_than(data, field, ops[op])
                        break;
                    case 'gt':
                        if (!Number.isFinite(ops[op])) throw new Error("Expecting a number", ops[op])
                        data = greater_than(data, field, ops[op])
                        break;
                    case 'eq':
                        if (!Number.isFinite(ops[op])) throw new Error("Expecting a number", ops[op])
                        data = equals_to(data, field, ops[op])
                        break;
                    case 'sort':
                        data = sort_by(data, field, (ops["sort"] === "desc"))
                        break;
                    default:
                        console.log('Operator not found')
                        throw new Error('Missing operator')
                }
            }
        }
    }
    return data
}
/********** Operators functions **********/
function less_than(data, field, value) {
    console.log('less_than', field, value)
    filtered_data = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element[field] < value)
            filtered_data.push(element)
    }
    return filtered_data
}

function greater_than(data, field, value) {
    filtered_data = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element[field] > value)
            filtered_data.push(element)
    }
    return filtered_data
}

function equals_to(data, field, value) {
    filtered_data = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        // console.log('element is :: ', i, element, field, element[field])
        if (element[field] == value)
            filtered_data.push(element)
    }
    return filtered_data
}

function sort_by(data, field, desc = true) {
    if (data != undefined && data.length > 0) {
        // --- Sort by NUMBER ---
        if (typeof data[0][field] === 'number' || !isNaN(data[0][field])) {
            data.sort(function (a, b) {
                if (desc)// desc order
                    return b[field] - a[field] // int desc
                else // Asc. order
                    return a[field] - b[field] // int asc
            });
        }
        // --- Sort by STRING  ---
        else if (typeof data[0][field] === 'string' || data[0][field] instanceof String) {
            data.sort(function (a, b) {
                let x = a[field].toLowerCase();
                let y = b[field].toLowerCase();
                if (desc) {// desc order
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                } else { // Asc. order
                    if (x < y) { return 1; }
                    if (x > y) { return -1; }
                    return 0;
                }
            })
        } else {
            throw new Error("Expected a number or string")
        }
    } else { throw new Warning("Can not sort empty data") }
    return data
}