class NewsController {
    // [GET] news
    index(req, res) {
        res.render('new');
    }
    show(req,res){
        res.send('New detail')
    }
}
module.exports = new NewsController;