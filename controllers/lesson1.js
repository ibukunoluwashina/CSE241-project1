const homeRoate = (req, res) => {
    res.send('Hello World')
};

const page1Roate = (req, res) => {
    res.send('page1')
};

module.exports = {
    homeRoate,
    page1Roate
}