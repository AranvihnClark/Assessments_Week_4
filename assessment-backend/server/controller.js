let languages = [{ language: `Java`, link: `https://www.codecademy.com/learn/learn-java`}, { language: `JavaScript`, link: `https://www.freecodecamp.org/news/23-free-websites-to-learn-javascript/`}, { language: `Python`, link: `https://developers.google.com/edu/python`}, { language: `Ruby`, link: `https://www.classcentral.com/course/sololearn-learn-ruby-102603`}, {language: `C++`, link: `https://www.learncpp.com/`}, { language: `C#`, link: `https://dotnet.microsoft.com/en-us/learn/csharp`}, { language: `PHP`, link: `https://www.learn-php.org/`}, { language: `SQL`, link: `https://www.datacamp.com/learn/sql`}, { language: `Go`, link: `https://go.dev/learn/`}];

let langaugeDisplay = [];

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = [
            `Money is around the corner - but beware of greed.`, `Plastic waste shall be in your future.`, `Lost love will return with darkness.`, `Yesterday's problems will catch up today.`, `A penny goes a long way in making friends.`, `Don't follow the rabbit beyond the rainbow.`, `Avoid the cracks or you'll break your mother's back.`]

            let randomIndex = Math.floor(Math.random() * fortunes.length);
            let randomFortunes = fortunes[randomIndex];

            res.status(200).send(randomFortunes);
    }, 
    addLanguage: (req, res) => {
        let selectedLanguage = req.body;

        for(let i = 0; i < languages.length; i++) {
            if(selectedLanguage[0] === languages[i].language) {
                langaugeDisplay.push(languages[i])
            }
        }

        res.status(200).send(langaugeDisplay);
    },
    showLinks: (req, res) => {
        res.status(200).send(langaugeDisplay);
    },
    hideLinks: (req, res) => {
        res.status(200).send(langaugeDisplay);
    },
    deleteLanguage: (req, res) => {
        let {language} = req.params;
        if(language === `C`) language = `C#`;
        for(let i = 0; i < langaugeDisplay.length; i++) {
            if(language === langaugeDisplay[i].language) {
                langaugeDisplay.splice(i, 1);
                break;
            }
        }
        res.status(200).send(langaugeDisplay);
    },
    replaceLanguage: (req, res) => {
        let {language} = req.params;
        language = language.split(`,`);
        let oldLanguage = language[0];
        let newLanguage = language[1];
        if(oldLanguage === `C`) language = `C#`;
        if(newLanguage === `C`) language = `C#`;
        let newInsert = [];

        for(let i = 0; i < languages.length; i++) {
            if(newLanguage === languages[i].language) {
                newInsert = languages[i];
                break;
            }
        }

        for(let i = 0; i < langaugeDisplay.length; i++) {
            if(oldLanguage === langaugeDisplay[i].language) {
                langaugeDisplay.splice(i, 1, newInsert);
                break;
            }
        }
        res.status(200).send(langaugeDisplay);
    }
}