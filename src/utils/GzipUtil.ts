import * as zlib from 'zlib';
import fs from 'fs'

export class GzipUtil {
    // Método para comprimir um JSON em gzip
    static compress(jsonString: string, path: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            zlib.gzip(jsonString, (error, result) => {
                if (error) reject(error);
                    
                fs.writeFile(path, result, (err) => {
                    if (err) return console.log(err);
                })

                resolve(result)
            });
        });
    }

    // Método para descomprimir um JSON gzip
    static decompress(gzipData: Buffer, path?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            zlib.gunzip(gzipData, (error, result) => {
                if (error) reject(error);
                const jsonString = result.toString('utf8');
                
                if (path) {
                    fs.writeFile(path, jsonString, (err) => {
                        if (err) return console.log(err);
                    })
                }
                resolve(jsonString)
            });
        });
    }
}
