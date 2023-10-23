import puppeteer from "puppeteer";


const openWebPage = async (url) => {
    const browser = await puppeteer.launch({
        headless: 'new',
        //args: ['--start-maximized'],
        defaultViewport: null,
    }); // Abre el navegador en modo no headless
    const page = await browser.newPage();

    // Espera a que la página se cargue completamente
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Realiza acciones en la página aquí, si es necesario
    await page.waitForSelector('.tabla_loterias');
    await page.waitForSelector('.module');


    const searching = await page.evaluate(() => {
        const trs = document.querySelectorAll('.tabla_loterias > tbody > tr');
        const moduleOptions = document.querySelectorAll('.module');
        const data = [];
        const numbers = [];
        const listNum = [];
        const nameLot = [];
        const nameSorteo = [];

        moduleOptions[2].querySelectorAll('a').forEach((a)=>{nameLot.push({lotName:a.innerText, lotHref:a.href})});
        moduleOptions[3].querySelectorAll('a').forEach((a)=>{nameSorteo.push({lotName:a.innerText, lotHref:a.href})});

        trs.forEach(tr => {
            const td = {}
            td.td = tr.querySelectorAll('td');
            data.push(td);
        });

        data.shift();

        data.forEach((td) => {
            numbers.push(td.td[1].innerText + ' Ganador ' + td.td[2].innerText);
            listNum.push(td.td[2].innerText.split(' ')[0]);
        });
        return { numbers, nameLot, nameSorteo, listNum };
    });

    //console.log(searching);
    // Cierra el navegador después de que hayas terminado
    await browser.close();
    return searching
}

export { openWebPage }