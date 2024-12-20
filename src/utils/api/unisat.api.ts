import axios from "axios";
import dotenv from "dotenv";
import { OPENAPI_UNISAT_TOKEN } from '../../config/api'

// Configuration from .env file
dotenv.config();

export const getInscriptions = async (address: string) => {
    try {
        let cursor = 0;
        const size = 16;
        let inscriptions: any = [];

        while (1) {
            const url = `https://open-api.unisat.io/v1/indexer/address/${address}/inscription-data`;

            const config = {
                headers: {
                    Authorization: `Bearer ${OPENAPI_UNISAT_TOKEN}`,
                },
            };

            let res = await axios.get(url, { ...config, params: { cursor, size } });
 
            if (res.data.code === -1) return [];
            else {
                inscriptions.push(...res.data.data.inscription);

                cursor += inscriptions.length;
                if (cursor >= res.data.data.total) break;
            }
        }
        return inscriptions;

    } catch (e) {
        console.log(e);
    }
};