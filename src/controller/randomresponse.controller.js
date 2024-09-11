import { MersenneTwister19937, integer } from 'random-js';
import { CORPUS, regenerateCorpuswithGemini } from '../model/randomresponse.model.js';



const engine = MersenneTwister19937.autoSeed();
let newCorpus = CORPUS;
let requestcount = 0;


export const randomchatcontroller = async (req, res) => {
    requestcount++;

    try {
        if (requestcount >= 9) {
            const result = await regenerateCorpuswithGemini();
            newCorpus = result;
            requestcount = 0;
        }
         /**
          * Generate a random Index, have explained in github readme why I went with this instead of Math.random();
         */
        const index = integer(0, newCorpus.length - 1)(engine);
        return res.status(201).json({ message: CORPUS[index] });


    } catch (error) {
        console.error("Error in randomchatcontroller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


