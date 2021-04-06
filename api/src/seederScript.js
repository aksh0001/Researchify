/**
 * Convenience script to insert some default data into the database.
 */
require('dotenv').config()

const connectDb = require('./config/db');
const Publication = require('./models/publication.model');


connectDb();

const defaultPublications = [
    {
        "teamId": "606bb59c22201f529db920c9",  // teamIds from a fake team manually created in the db
        "authors": ["A", "B", "C"],
        "title": "Case definitions for infectious conditions under public health surveillance",
        "link": "https://wonder.cdc.gov/wonder/Prevguid/m0047449/m0047449.asp",
        "description": "State and local public health officials rely on health-care providers, laboratories, and other\n" +
            "public health personnel to report the occurrence of notifiable diseases to state and local\n" +
            "health departments."
    },
    {
        "teamId": "606bb59c22201f529db920c9",
        "authors": ["D", "E", "F"],
        "title": "Staphylococcus aureus with reduced susceptibility to vancomycin--United States, 1997",
        "link": "http://wonder.cdc.gov/wonder/PrevGuid/m0049042/m0049042.asp",
        "description": "Staphylococcus aureus is one of the most common causes of both hospital-and community-" +
            "acquired infections worldwide, and the antimicrobial agent vancomycin"
    },
    {
        "teamId": "606bb5c022201f529db920ca",
        "authors": ["G", "H", "I"],
        "title": "Diagnostic standards and classification of tuberculosis",
        "link": "https://wonder.cdc.gov/wonder/Prevguid/p0000425/p0000425.asp",
        "description": "Historically, the American Thoracic Society (ATS) and the Centers for Disease Control" +
            "(CDC) have provided guidance on the diagnosis, treatment, prevention, and control of" +
            "tuberculosis in the United States and Canada. "
    }
];

const importData = async () => {
    try {
        await Publication.deleteMany({});

        await Publication.insertMany(defaultPublications);
        console.log('Successfully imported data.');
        process.exit(0);
    } catch (err) {
        console.error('Error importing data.\n' + err);
        process.exit(1);
    }
};

importData();