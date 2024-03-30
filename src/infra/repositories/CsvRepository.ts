import { parse } from 'csv-parse/sync';
import fs from 'fs'


export class CSVRepository {

    constructor() {}

    public async readFile(filePath: string) {

        const file = fs.readFileSync(filePath)

        try {
            const records = parse(file, {
                columns: true,
                delimiter: ';'
            })

            return records

        } catch (err) {

            return err
        }
    }
}