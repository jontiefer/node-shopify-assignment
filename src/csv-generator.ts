export class CSVGenerator {
    constructor() {

    }

    /** Will convert an object containing simple data types and generate an array of strings in CSV format  */
    public static generateCSVArrayFromObjectArray(objectData: {[key: string]: any}[]): string[] {
        const csvArray: string[] = [];

        objectData.forEach(data => {
            let csvRecord = '';

            const objValues = Object.values(data);

            objValues.forEach(value => {
                let fieldData;

                switch(typeof value) {
                    case 'object':
                        if (value instanceof Date) {
                             fieldData = (value as Date).toLocaleDateString("en-US");
                        } else {
                            try {
                                fieldData = value !== null ? value.toString() : 'NULL';                                                                    
                            } catch(ex) {

                            }                            
                        }

                        break;
                    default:
                        fieldData = value ?? 'NULL';
                        break;
                }
                
                csvRecord += `${fieldData}, `;
            });

            csvRecord = csvRecord.slice(0, -2);
            csvArray.push(csvRecord);
        });

        return csvArray;
    }
}