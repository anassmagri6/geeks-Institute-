const artist  = require('../models/Artist.js');

exports.getArtists = async (req, res) => {
    try {
        const artists = await artist.find();
        res.render('artists/index', { artists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const {name,bio,genre} = req.body;
        await artist.create({name,bio,genre});
        res.redirect('/artists');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateArtist = async (req, res) =>{
    try {
const {id} = req.params;
const {name,bio,genre} = req.body;
await artist.findByIdAndUpdate(id,{name,bio,genre},{runValidators:true});
res.redirect('/artists');
    } catch (error){
        res.status(500).json({ error: error.message });
        }
    };

exports.deleteArtist = async (req, res) => {
    try {
        const {id} = req.params;
        await artist.findByIdAndDelete(id);
        res.redirect('/artists');
    }catch (error) {
        res.status(500 ).json({ error: error.message });
    }

      }           


    






       






