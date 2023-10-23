import { openWebPage } from "../helpers/scanner.js"

const getLotResult = async (req, res) => {

    const loteria = await openWebPage('https://loteriasdehoy.co/motilon-noche');

    res.render('index', { results: { loteria } });
}

const getLotResultPost = async (req, res) => {
    const { url } = req.body;
    try {
        //console.log(url);
        const loteria = await openWebPage(url);
        //console.log(loteria);
        res.send({ results: { loteria } });
    } catch (error) {
        console.log(error);
    }
}

export { getLotResult, getLotResultPost }