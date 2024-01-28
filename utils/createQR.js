const googleAPIURL = 'https://chart.googleapis.com/chart?cht=qr';

module.exports = {
    createQR(data, height, width){
        if(!data) {
            throw new Error('A url must be provided');
        }
        const url = `${googleAPIURL}&chl=${data}${height && width ? "&chs=" + width + "x" + height :"&chs=200x200"}`;
        console.log(url);
        return url;
    }
}