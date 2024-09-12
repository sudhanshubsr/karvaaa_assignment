import { MersenneTwister19937, integer } from 'random-js';
import { CORPUS, regenerateCorpuswithGemini } from '../model/randomresponse.model.js';

// Set up the random number generator with an auto-seeded engine
const engine = MersenneTwister19937.autoSeed();
let newCorpus = CORPUS;
let requestcount = 0;

export const randomchatcontroller = async (req, res) => {
    requestcount++;

    try {
        // Regenerate the corpus using Gemini API after a certain number of requests
        if (requestcount >= 9) {
            const result = await regenerateCorpuswithGemini();
            newCorpus = result;
            requestcount = 0; // Reset the request count after regenerating
        }

        /**
         * Generate a random index for selecting a response from the corpus.
         * I used `random-js` here instead of `Math.random()` to get more uniform random numbers.
         */
        const index = integer(0, newCorpus.length - 1)(engine);
        return res.status(201).json({ message: newCorpus[index] });

    } catch (error) {
        console.error("Error in randomchatcontroller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
