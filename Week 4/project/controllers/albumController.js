const album = require('../models/Album.js');

exports.getAlbums = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const totalAlbums = await album.countDocuments();
        const albums = await album.find()
            .populate('artist')
            .skip(skip)
            .limit(limit);
    
        res.render('albums/index',{
            albums,
            currentPage:page,
            totalPages:Math.ceil(totalAlbums / limit),
        });
        } catch (error) {
            res.status(500).json({error: error.message});
            }   
    };

exports.createAlbum = async (req, res) =>{
    try {
 const {title, artist, releaseDate, tracks} = req.body;
 const newalbum = new album({
        title,
        artist,
        releaseDate,
        tracks,
    });
    await newalbum.save();
    res.redirect('/albums');
    } catch (error) {
        res.status( 500).json({error: error.message });
            }
};

exports.updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, releaseDate, tracks } = req.body;
        await album.findByIdAndUpdate(
            id, 
            { title, artist, releaseDate, tracks }, 
            { runValidators: true });
            
        res.redirect('/albums');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAlbum = async (req, res) => {
try {
const { id } = req.params;
await album.findByIdAndDelete(id);
res.redirect('/albums');
} catch (error) {
res.status(500).json({ error: error.message });         
 }

}       











        

