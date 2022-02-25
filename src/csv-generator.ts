export class CSVGenerator {
    constructor() {

    }

    /** Will convert an JSON object and generate a CSV formatted record  */
    public static generateCSVRecordFromObject(objectData: {[key: string]: any}): string {        
        const csvRecord: string = Object.values(objectData).reduce((previousVal, currentVal) => {            
            let fieldData: string;            

            if (!currentVal)
                fieldData = 'NULL';                                        
            else {
                fieldData = (currentVal instanceof Date) ?
                    (currentVal as Date).toLocaleDateString("en-US") :                    
                    JSON.stringify(currentVal);
            }
            
            return previousVal += `${fieldData}, `;
        }, '').slice(0, -2);
        
        return csvRecord;
    }

    /** Will convert an JSON object array and generate a CSV formatted record string array  */
    public static generateCSVArrayFromObjectArray(objectDataArray: {[key: string]: any}[]): string[] {        
        return objectDataArray.map(
            (objData) => this.generateCSVRecordFromObject(objData));         
    }
}