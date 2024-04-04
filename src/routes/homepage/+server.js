import OpenAI from 'openai';
import { config } from 'dotenv';
import { Buffer } from 'buffer';


config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

let messages = [
    { role: "system", content: "Als virtuele reisplanner gespecialiseerd in openbaar vervoer, ontvang je routeplanningen van een externe bron (bijvoorbeeld een API) die de snelste of meest efficiënte route voorstelt. Jouw taak is om deze route op een overtuigende manier aan de gebruiker te presenteren. Als de route complex is of veel tussenstops bevat, focus je op de hoofdpunten: vertrek- en aankomsttijden, belangrijkste overstappen en de totale reisduur. Vermijd het opsommen van alle tussenliggende stations tenzij de gebruiker hier specifiek naar vraagt. Na de presentatie van de route, vraag je of de gebruiker meer details wenst over de tussenliggende stations of andere aspecten van de reis.  " },
];
let isFirstMessage = true;
let route = {};
export async function POST(request) {
    isFirstMessage = true;
    try {
        const body = await request.request.json();
        if (!body || !body.transcript) {
            return new Response(JSON.stringify({ error: 'Bad Request' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const { transcript } = body;
       

        if (isFirstMessage) {
        let volledigeRoute = await extractLocaties(transcript);
        console.log(JSON.stringify(volledigeRoute, null, 2))

        route = {
            vertrekAdres: volledigeRoute.routes[0].legs[0].start_address,
            aankomstAdres: volledigeRoute.routes[0].legs[0].end_address,
            vertrektijd: volledigeRoute.routes[0].legs[0].departure_time.text,
            aankomsttijd: volledigeRoute.routes[0].legs[0].arrival_time.text,
            totaleAfstand: volledigeRoute.routes[0].legs[0].distance.text,
            totaleDuur: volledigeRoute.routes[0].legs[0].duration.text,
            stappen: volledigeRoute.routes[0].legs[0].steps.map(step => {
                // Check of de stap een treinreis of wandeling is en pas de structuur aan
                if (step.travel_mode === "TRANSIT") {
                    return {
                        type: "Trein",
                        vertrek: step.transit_details.departure_stop.name,
                        vertrektijd: step.transit_details.departure_time.text,
                        aankomst: step.transit_details.arrival_stop.name,
                        aankomsttijd: step.transit_details.arrival_time.text,
                        afstand: step.distance.text,
                        duur: step.duration.text
                    };
                } else if (step.travel_mode === "WALKING") {
                    // Voeg extra velden toe voor wandelafstanden en -tijden
                    return {
                        type: "Lopen",
                        instructie: step.html_instructions,
                        afstand: step.distance.text,
                        duur: step.duration.text
                    };
                }
            }),
            waarschuwingen: volledigeRoute.routes[0].warnings
        };
        
        
        console.log(route)

        messages.push({ role: "user", content: transcript + " Gevonden route: " + JSON.stringify(route)});

        isFirstMessage = false;


        } else{

        messages.push({ role: "user", content: transcript });

        

        }
      

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo-0125",
        });

        const textResponse = completion.choices[0].message.content;

        messages.push({ role: "assistant", content: textResponse });

        const speechResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: textResponse,
        });

        const buffer = Buffer.from(await speechResponse.arrayBuffer());
        const audioBase64 = buffer.toString('base64');

        return new Response(JSON.stringify({
            audio: audioBase64,
            route: route
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

async function extractLocaties(transcript){
   let begin = ""
   let eind = ""

   const locaties = transcript.toLowerCase().split(" naar ")
    console.log(transcript)
    if(locaties.length > 1){
        begin = locaties[0].split(" ").pop().trim()
        eind = locaties[1].split(" ")[0].trim()
        console.log("Begin: " + begin)
        console.log("Eind: " + eind)
        let route = await getRoute(begin, eind)
        return route
    }
}

async function getRoute(begin, eind) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(begin)}&destination=${encodeURIComponent(eind)}&mode=transit&language=nl&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
    
        return data;
    } catch (error) {
        console.error('Error ophalen route:', error);
        throw error;
    }
}

